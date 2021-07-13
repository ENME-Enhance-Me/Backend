import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from 'src/helpers/crypto';
import { Phone } from 'src/modules/phone/entities/phone.entity';

@ObjectType()
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    transformer: hashPasswordTransform
  })
  @HideField()
  password: string;

  @OneToMany(() => Phone, phone => phone.user)
  phones: Phone[];

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
