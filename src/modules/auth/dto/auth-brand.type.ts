import { Field, ObjectType } from "@nestjs/graphql";
import { Brand } from "src/modules/brand/entities/brand.entity";
import { User } from "src/modules/user/entities/user.entity";

@ObjectType()
export class AuthBrandType {
    @Field(() => Brand)
    brand: Brand;
    @Field(() => User)
    user: User;
    @Field()
    token: string;
}