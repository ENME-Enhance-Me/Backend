import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateQuestionInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  qtypeID?: string;
}
