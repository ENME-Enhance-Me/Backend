import { Field, ObjectType } from "@nestjs/graphql";
import { Brand } from "src/modules/brand/entities/brand.entity";
import { Client } from "src/modules/clients/entities/client.entity";
import { User } from "src/modules/user/entities/user.entity";

@ObjectType()
export class AuthBothType {
    @Field(() => Brand)
    brand?: Brand;
    @Field(() => Client)
    client?: Client;
    @Field(() => User)
    user: User;    
    @Field()
    token: string;
}