import { CreatePhoneInput } from './create-phone.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdatePhoneInput {

  @IsNumber()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  DDD?: number;

  @IsString()
  @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
  @IsOptional()
  number?: string;

}
