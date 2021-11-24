import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateWinnerInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  rewardId?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  clientID?: string;
}
