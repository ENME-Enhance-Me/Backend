import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum QuestionTypeEnum {
  singleChoice = '8ae93597-26d7-44bf-81bd-7683500703d8',
  multipleChoices = 'c86649cc-e5dd-4c9a-bea8-8c3caa02cb7b',
  orderedChoices = 'd32a8b56-69de-4041-9e78-40ae0902ec4c',
  opened = 'b502a5ab-c6c5-42db-af34-89315dc0ddac'
}
registerEnumType(QuestionTypeEnum, {
  name: 'QuestionTypeEnum',
});

@Entity('questiontype')
@ObjectType()
export class QuestionType {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;
}
