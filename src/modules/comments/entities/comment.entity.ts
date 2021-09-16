import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Research } from 'src/modules/research/entities/research.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('comments')
@ObjectType()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @OneToOne(() => Research)
  @JoinColumn()
  research: Research;

  @RelationId((comment: Comment) => comment.research)
  researchID: string;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
