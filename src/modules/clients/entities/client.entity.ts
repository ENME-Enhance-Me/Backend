import { ObjectType, Field, Int, HideField, registerEnumType } from '@nestjs/graphql';
import { Address } from 'src/modules/address/entities/address.entity';
import { Clientbrand } from 'src/modules/clientbrand/entities/clientbrand.entity';
import { MicroSegment } from 'src/modules/micro-segments/entities/micro-segment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Winner } from 'src/modules/winners/entities/winner.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

export enum gender{
  Masculino,
  Feminino,
  Nao_Binario
}
registerEnumType(gender, {
  name: 'Gender',
});

@Entity('client')
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
  @Field(()=> gender)
  gender: gender;

  @Column()
  birthdate: Date;

  @Column()
  reputation: number;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @RelationId((client: Client) => client.address)
  addressID: string;

  @OneToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({name: "userID"})
  user: User;

  @RelationId((client: Client) => client.user)
  userID: string;

  @ManyToMany(() => MicroSegment, segment => segment.clients, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  segments: MicroSegment[]

  @OneToMany(() => Clientbrand, clientbrand => clientbrand.client, { nullable: true })
  brands: Clientbrand[];

  @OneToMany(() => Winner, winner => winner.client, { nullable: true })
  rewards: Winner[];

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;

}
