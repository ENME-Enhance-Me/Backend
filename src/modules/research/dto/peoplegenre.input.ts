import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class PeopleGenreInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  researchID: string;
}
