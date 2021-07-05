import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity('clients')
@ObjectType()
export class Client {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  gender: string;

  @Column()
  birthdate: Date;

  @Column()
  reputation: number;

  @OneToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn()
  user: User;

  @RelationId((client: Client) => client.user)
  userId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
