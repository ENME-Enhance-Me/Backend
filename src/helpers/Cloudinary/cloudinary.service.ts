import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { Cloudinary } from './cloudinary';


@Injectable()
export class CloudinaryService {


  async uploadImage(
    file: FileUpload,
    folderName: string
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({
        allowed_formats: ["jpg", "png"],
        folder: folderName
      }, (error, result) => {
        if (error) return reject(error);
        resolve(result);

      });
      try {
        file.createReadStream().pipe(upload)
          .on('finish', () => "true")
          .on('error', () => { throw new BadRequestException('Erro no pipe.'); });
      }
      catch (err) {
        throw new BadRequestException('imagem inexistente ou formato errado.');
      }
    });

  }
  async deleteImage(link: string) {
    const cloud = require('cloudinary').v2;
    cloud.config(Cloudinary.useFactory());
    const a = cloud.uploader.destroy(link, function(error,result) {
      console.log(result, error) });
    return a;
  }

  public getIDImage(link: string): string {
    const parts = link.split('/');
    const imageid = parts[parts.length - 1].split('.')[0];
    return imageid

  }
}
