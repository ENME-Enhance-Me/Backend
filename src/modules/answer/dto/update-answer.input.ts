import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateAnswerInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  questionOptionID?: string;
}
