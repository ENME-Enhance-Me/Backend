import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('mtags')
@ObjectType()
export class Mtag {
  
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  tag: string;

  @ManyToOne(() => Brand, brand => brand.mTags)
  brand: Brand;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
