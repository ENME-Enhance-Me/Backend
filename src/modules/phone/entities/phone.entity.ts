import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('Phone')
@ObjectType()
export class Phone {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  DDD: number;

  @Column()
  number: string;

  @ManyToOne(() => User, user => user.phones, { onDelete: "CASCADE"})
  user: User;

  @RelationId((phone: Phone) => phone.user)
  userID: string;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
