import { CreateAddressInput } from './create-address.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateAddressInput {
  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  ownerID: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  publicPlace?: string;

  @IsInt()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  number?: number;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  CEP?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  neighborhood?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  city?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  state?: string;
}
