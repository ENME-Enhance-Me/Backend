import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { Mtag } from 'src/modules/mtags/entities/mtag.entity';
import { Question } from 'src/modules/question/entities/question.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

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

  @OneToMany(() => Answer, answer => answer.questionOption)
  answers: Answer[];

  @ManyToOne(() => Mtag, {onDelete: 'SET NULL'})
  mTag: Mtag;

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
