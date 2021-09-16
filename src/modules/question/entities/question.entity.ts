import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { QuestionOption } from 'src/modules/question-options/entities/question-option.entity';
import { QuestionType } from 'src/modules/question/entities/question-type.entity';
import { Research } from 'src/modules/research/entities/research.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

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

  @Column({default: 'https://res.cloudinary.com/enme/image/upload/v1629924117/enme/questionImage/padrao/banner-azul.jpg'})
  image: string;

  @ManyToOne(() => Research, research => research.questions, { onDelete: "CASCADE"})
  research: Research;

  @RelationId((question: Question) => question.research)
  researchID: string;

  @OneToMany(() => QuestionOption, qOption => qOption.question)
  options: QuestionOption[];

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
