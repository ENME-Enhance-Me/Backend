import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Clientbrand } from 'src/modules/clientbrand/entities/clientbrand.entity';
import { QuestionOption } from 'src/modules/question-options/entities/question-option.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('answers')
@ObjectType()
export class Answer {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:true})
  description?: string;

  @ManyToOne(() => Clientbrand, { onDelete: "CASCADE" })
  client: Clientbrand;

  @RelationId((answer: Answer) => answer.client)
  clientID: string;

  @ManyToOne(() => QuestionOption, { onDelete: "CASCADE" })
  questionOption: QuestionOption;

  @RelationId((answer: Answer) => answer.questionOption)
  questionOptionID: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
