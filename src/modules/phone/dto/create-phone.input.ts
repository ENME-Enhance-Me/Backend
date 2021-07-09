import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

@InputType()
export class CreatePhoneInput {

  @IsNumber()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  DDD: number;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  number: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  brandID?: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  clientID?: string;
}
