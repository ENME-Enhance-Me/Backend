import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { City } from './city.entity';

@Entity('state')
@ObjectType()
export class State {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => City, city => city.state, {onDelete: 'CASCADE'})
  cities: City[];

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
