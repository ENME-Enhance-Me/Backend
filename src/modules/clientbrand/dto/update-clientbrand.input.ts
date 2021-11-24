import { CreateClientbrandInput } from './create-clientbrand.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateClientbrandInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  id: string;
  
  @IsBoolean()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  isClient?: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  isVIP?: boolean;
  
  @IsNumber()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  mCoins?: number;
}
