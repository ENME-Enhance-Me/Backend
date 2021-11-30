import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OptionResearchInput } from 'src/modules/question-options/dto/options-research.input';
import { QuestionTypeEnum } from '../entities/question-type.entity';

@InputType()
export class QuestionResearchInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  description: string;

  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  options: OptionResearchInput[];

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  qtypeID: QuestionTypeEnum;
}
