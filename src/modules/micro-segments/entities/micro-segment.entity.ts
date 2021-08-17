import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { MacroSegment } from 'src/modules/macro-segments/entities/macro-segment.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('microsegment')
@ObjectType()
export class MicroSegment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => MacroSegment, segment => segment.microSegments, { nullable: true })
  @JoinTable()
  macroSegments: MacroSegment[];

  @ManyToMany(() => Client, client => client.segments)
  clients: Client[];

  @ManyToMany(() => Brand, brand => brand.segments)
  brands: Brand[];

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
