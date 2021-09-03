import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  questionOptionID: string;
}
