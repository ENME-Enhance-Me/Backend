import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

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

  @RelationId((mtag: Mtag) => mtag.brand)
  brandID: string;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
