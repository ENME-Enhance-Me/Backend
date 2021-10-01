import { CreateClientbrandInput } from './create-clientbrand.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClientbrandInput extends PartialType(CreateClientbrandInput) {
  @Field(() => Int)
  id: number;
}
