import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMicroSegmentInput {

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  MacroIDs: string[];
  
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;

}
