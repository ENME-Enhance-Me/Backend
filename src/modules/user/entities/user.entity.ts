import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from 'src/helpers/crypto';

@ObjectType()
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({
    transformer: hashPasswordTransform
  })
  @HideField()
  password: string;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
