import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class PeopleGroupInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  userID: string;
}
