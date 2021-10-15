import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateWinnerInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  rewardId: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  clientID: string;
}
