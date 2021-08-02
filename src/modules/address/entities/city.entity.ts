import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './address.entity';
import { Neighborhood } from './neighborhood.entity';
import { State } from './state.entity';

@Entity('city')
@ObjectType()
export class City {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Neighborhood, neighborhood => neighborhood.city)
  Neighborhoods: Neighborhood[];

  @ManyToOne(() => State, state => state.cities)
  state: State;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
