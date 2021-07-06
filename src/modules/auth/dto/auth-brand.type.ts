import { Field, ObjectType } from "@nestjs/graphql";
import { Brand } from "src/modules/brand/entities/brand.entity";

@ObjectType()
export class AuthBrandType {
    @Field(() => Brand)
    brand: Brand;
    @Field()
    token: string;
}