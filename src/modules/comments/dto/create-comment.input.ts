import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  text: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  answerID: string;
}
