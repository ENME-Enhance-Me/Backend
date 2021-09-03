import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { QuestionOption } from 'src/modules/question-options/entities/question-option.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('comments')
@ObjectType()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @OneToOne(() => Answer)
  @JoinColumn()
  answer: Answer;

  @RelationId((comment: Comment) => comment.answer)
  answerID: string;

  @ManyToOne(() => QuestionOption, {onDelete: "CASCADE"})
  questionOption: QuestionOption;

  @RelationId((comment: Comment) => comment.questionOption)
  questionOptionID: string;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
