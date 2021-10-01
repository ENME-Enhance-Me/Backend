import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateClientbrandInput {
  @IsBoolean()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  isClient: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  isVIP: boolean;
  
  @IsNumber()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  mCoins: number;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  brandID: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  clientID: string;
}
