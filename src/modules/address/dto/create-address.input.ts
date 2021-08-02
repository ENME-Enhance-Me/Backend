import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {

  @Field()
  ownerID: string;

  @Field()
  publicPlace: string;

  @Field(() => Int)
  number: number;

  @Field()
  complement: string;

  @Field()
  CEP: string;

  @Field()
  neighborhood: string;

  @Field()
  city: string;

  @Field()
  state: string;
}
