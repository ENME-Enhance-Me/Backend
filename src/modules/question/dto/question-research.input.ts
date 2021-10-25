import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { OptionResearchInput } from 'src/modules/question-options/dto/options-research.input';

@InputType()
export class QuestionResearchInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  description: string;

  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  options: OptionResearchInput;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  qtypeID: string;
}
