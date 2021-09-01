import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateQuestionOptionInput {

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  questionID: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  nextQuestion: boolean;
}
