import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMtagInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  tag: string;
  
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  brandID: string;
}
