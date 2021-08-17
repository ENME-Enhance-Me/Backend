import { CreateMacroSegmentInput } from './create-macro-segment.input';
import { InputType,  } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateMacroSegmentInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;
}
