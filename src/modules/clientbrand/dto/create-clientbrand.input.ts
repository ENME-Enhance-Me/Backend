import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClientbrandInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
