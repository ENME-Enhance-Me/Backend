import { ObjectType, Field, Int, HideField, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

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

  @OneToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn({name: "userID"})
  user: User;

  @RelationId((client: Client) => client.user)
  userID: string;

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;

}
