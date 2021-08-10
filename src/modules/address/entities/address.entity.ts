import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @OneToOne(() => Brand)
  brand?: Brand;

  @OneToOne(() => Client)
  client?: Client;

  @ManyToOne(() => Neighborhood, neighborhood => neighborhood.addresses)
  neighborhood: Neighborhood;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
