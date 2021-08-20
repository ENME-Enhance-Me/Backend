import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { QuestionType } from 'src/modules/question/entities/question-type.entity';
import { Research } from 'src/modules/research/entities/research.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('question')
@ObjectType()
export class Question {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numberQuestion: number;

  @Column()
  description: string;

  @ManyToOne(() => Research, research => research.questions, { onDelete: "CASCADE"})
  research: Research;

  @RelationId((question: Question) => question.research)
  researchID: string;

  @ManyToOne(() => QuestionType, { onDelete: "CASCADE"})
  questionType: QuestionType;

  @RelationId((question: Question) => question.questionType)
  questionTypeID: string;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
