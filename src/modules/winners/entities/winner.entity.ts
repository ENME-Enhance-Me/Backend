import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Reward } from 'src/modules/reward/entities/reward.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('winners')
@ObjectType()
export class Winner {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, client => client.rewards, { onDelete: "CASCADE"})
  client: Client;

  @RelationId((winner: Winner) => winner.client)
  clientID: string;

  @ManyToOne(() => Reward, reward => reward.clients, { onDelete: "CASCADE"})
  reward: Reward;

  @RelationId((winner: Winner) => winner.reward)
  rewardId: string;

  @Column({ nullable: true })
  qrCode?: string;

}
