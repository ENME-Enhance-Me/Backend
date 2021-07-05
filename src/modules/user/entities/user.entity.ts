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
  UserName: string;

  @Column()
  Email: string;

  @Column({
    transformer: hashPasswordTransform
  })
  @HideField()
  Password: string;

  @CreateDateColumn()
  Created_at: Date;

  @UpdateDateColumn()
  Updated_at: Date;
}
