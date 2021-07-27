import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateSegmentInput {

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;
}
