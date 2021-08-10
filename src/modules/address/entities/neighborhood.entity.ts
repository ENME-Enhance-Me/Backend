import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './address.entity';
import { City } from './city.entity';

@Entity('neighborhood')
@ObjectType()
export class Neighborhood {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Address, address => address.neighborhood, {onDelete: 'CASCADE'})
  addresses: Address[];

  @ManyToOne(() => City, city => city.Neighborhoods)
  city: City;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
