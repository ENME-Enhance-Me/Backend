import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  researchID: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  qtypeID: string;
}
