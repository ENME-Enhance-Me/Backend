import { Field, ObjectType } from "@nestjs/graphql";
import { Client } from "src/modules/clients/entities/client.entity";

@ObjectType()
export class AuthClientType {
    @Field(() => Client)
    client: Client;
    @Field()
    token: string;
}