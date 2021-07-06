import { ObjectType, Field, HideField } from '@nestjs/graphql';
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
  company_name: string;

  @Column()
  CNPJ_CPF: string;

  @OneToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({name: "userID"})
  user: User;

  @RelationId((brand: Brand) => brand.user)
  userID: string;
  
  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
