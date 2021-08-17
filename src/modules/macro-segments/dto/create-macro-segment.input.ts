import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMacroSegmentInput {

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  MicroIDs?: string[];

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;
}
