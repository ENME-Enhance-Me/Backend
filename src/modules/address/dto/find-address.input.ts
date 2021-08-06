import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class FindAddressInput {

    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    brandID?: string;

    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    clientID?: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
    @IsOptional()
    addressID?: string;

}
