import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questiontype')
@ObjectType()
export class QuestionType {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;
}
