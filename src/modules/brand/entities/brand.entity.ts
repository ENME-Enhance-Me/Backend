import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Segment } from 'src/modules/segments/entities/segment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity('brand')
@ObjectType()
export class Brand {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  company_name: string;

  @Column({unique: true})
  CNPJ_CPF: string;

  @Column()
  @Field()
  logo: string;

  @OneToMany(() => User, user => user.brand)
  users: User[];

  @ManyToMany(() => Segment, segment => segment.brands)
  @JoinTable()
  segments: Segment[];
  
  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
