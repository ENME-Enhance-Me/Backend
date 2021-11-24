import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Winner } from 'src/modules/winners/entities/winner.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('rewards')
@ObjectType()
export class Reward {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => Brand, brand => brand.rewards, { onDelete: "CASCADE", nullable: true })
  brand: Brand;

  @RelationId((reward: Reward) => reward.brand)
  brandID: string;

  @OneToMany(() => Winner, winner => winner.reward, { nullable: true })
  clients: Winner[];

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
