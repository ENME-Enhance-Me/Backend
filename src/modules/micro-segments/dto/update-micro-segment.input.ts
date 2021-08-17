import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateMicroSegmentInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;
}
