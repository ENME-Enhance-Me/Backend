import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Question } from 'src/modules/question/entities/question.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('questionOptions')
@ObjectType()
export class QuestionOption {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => Question, question => question.options, { onDelete: "CASCADE" })
  question: Question;

  @RelationId((option: QuestionOption) => option.question)
  questionID: string;

  @Column()
  @Field((type) => Boolean)
  nextQuestion: boolean;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
