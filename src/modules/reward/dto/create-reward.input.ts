import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { RewardTypeEnum } from '../entities/reward.entity';

@InputType()
export class CreateRewardInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  type: RewardTypeEnum;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  brandID: string;
}
