import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RewardResearchInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  description: string;
  
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  type: string;
}
