import { CreateMtagInput } from './create-mtag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateMtagInput extends PartialType(CreateMtagInput) {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  tag: string;
}
