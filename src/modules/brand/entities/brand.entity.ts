import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
@ObjectType()
export class Brand {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Company_name: string;

  @Column()
  CNPJ_CPF: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @RelationId((brand: Brand) => brand.user)
  userID: string;
}
