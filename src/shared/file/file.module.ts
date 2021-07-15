import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { FileResolver } from './file.resolver';

@Module({
  providers: [FileResolver, CloudinaryService]
})
export class FileModule {}
