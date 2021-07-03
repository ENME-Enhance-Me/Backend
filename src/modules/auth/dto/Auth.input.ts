import { InputType } from "@nestjs/graphql";

@InputType()
export class AuthInput {
    Email: string;
    Password: string;
}