import { CreateResearchInput } from './create-research.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateResearchInput extends PartialType(CreateResearchInput) {
  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  description?: string;

  @IsDate()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  finishDate?: Date;
}
