import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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


  @Column()
  Company_name: string;

  @Column()
  CNPJ_CPF: string;

  @OneToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @RelationId((brand: Brand) => brand.user)
  userID: string;
  
  @CreateDateColumn()
  Created_at: Date;

  @UpdateDateColumn()
  Updated_at: Date;
}
