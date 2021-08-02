import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Neighborhood } from './neighborhood.entity';

@Entity('address')
@ObjectType()
export class Address {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  publicPlace: string;

  @Column('integer', { nullable: true })
  number: number;

  @Column()
  complement: string;

  @Column()
  CEP: string;

  @ManyToOne(() => Neighborhood, neighborhood => neighborhood.addresses)
  neighborhood: Neighborhood;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
