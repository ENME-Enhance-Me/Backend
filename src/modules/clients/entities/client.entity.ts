import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('clients')
@ObjectType()
export class Client {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Gender: string;

  @Column()
  BirthDate: Date;

  @Column()
  Reputation: number;

  @OneToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn()
  user: User;

  @RelationId((client: Client) => client.user)
  userId: string;

}
