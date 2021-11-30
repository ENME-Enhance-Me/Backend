import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { O_NOFOLLOW } from 'constants';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Question } from 'src/modules/question/entities/question.entity';
import PeopleGenre from 'src/modules/user/entities/people-group.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('research')
@ObjectType()
export class Research {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  finishDate?: Date;

  @Column({ default: 18 })
  ageGroupStart: number;

  @Column({ nullable: true })
  ageGroupEnd?: number;

  @Column({ default: 10 })
  locationRange: number;
  
  @Column({ default: false })
  forLead: boolean;

  @Column({ default: false })
  forClient: boolean;

  @Column({ default: 'ALL'})
  peoplegroup: string;

  @ManyToOne(() => Brand, brand => brand.researchs, { onDelete: "CASCADE", nullable: true })
  brand: Brand;

  @RelationId((research: Research) => research.brand)
  brandID: string;

  @OneToMany(() => Question, question => question.research, { onDelete: "CASCADE"})
  questions: Question[];

  @ManyToMany(() => PeopleGenre, peopleGroup => peopleGroup.researchs, { onDelete: "CASCADE"})
  @JoinTable()
  peopleGenres: PeopleGenre[];

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
