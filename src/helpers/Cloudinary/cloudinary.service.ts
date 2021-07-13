import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { Stream } from 'stream';


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
        },(error, result) => {
            if (error) return reject(error);
            resolve(result);
            
        }); 
        file.createReadStream().pipe(upload)
        .on('finish', () => "true")
        .on('error', () => {throw new BadRequestException('Erro no pipe.');})
    });

  }
}
