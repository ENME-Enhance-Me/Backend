import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';

@Resolver()
export class FileResolver {
  constructor(private readonly cloudService: CloudinaryService) { }
  @Mutation(() => String)
  async uploadFile(@Args({ name: 'file', type: () => GraphQLUpload })
  File: FileUpload): Promise<string> {
    const response = await this.cloudService.uploadImage(File, "enme")
    return response.url;
  }
}
