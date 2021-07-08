import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Phone } from "../entities/phone.entity";

@InputType()
export default class FindPhoneInput {

    @IsString()
    @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
    @IsOptional()
    id?: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
    @IsOptional()
    DDD?: number;
  
    @IsString()
    @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
    @IsOptional()
    number?: string;

    @IsString()
    @IsNotEmpty({ message: 'Campo Gênero não pode estar vazio' })
    @IsOptional()
    userID?: string;

}