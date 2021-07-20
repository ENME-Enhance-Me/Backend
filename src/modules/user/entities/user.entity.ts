import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from 'src/helpers/crypto';
import { Phone } from 'src/modules/phone/entities/phone.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';

@ObjectType()
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Field()
  avatar: string;

  @Column({
    transformer: hashPasswordTransform
  })
  @HideField()
  password: string;

  @OneToMany(() => Phone, phone => phone.user)
  phones: Phone[];

  @ManyToOne(() => Brand, brand => brand.users)
  brand: Brand;

  @RelationId((user: User) => user.brand)
  brandId: string;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
