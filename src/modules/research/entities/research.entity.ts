import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { O_NOFOLLOW } from 'constants';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Question } from 'src/modules/question/entities/question.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('research')
@ObjectType()
export class Research {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  finishDate?: Date;

  @ManyToOne(() => Brand, brand => brand.researchs, { onDelete: "CASCADE", nullable: true })
  brand: Brand;

  @RelationId((research: Research) => research.brand)
  brandID: string;

  @OneToMany(() => Question, question => question.research)
  questions: Question[];

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
