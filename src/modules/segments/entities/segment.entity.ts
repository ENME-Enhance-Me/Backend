import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('segment')
@ObjectType()
export class Segment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Segment, segment => segment.macroSegment, { nullable: true })
  microSegments: Segment[];

  @ManyToOne(() => Segment, segment => segment.microSegments, { nullable: true })
  macroSegment: Segment;

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
