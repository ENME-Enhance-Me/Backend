import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Mtag } from 'src/modules/mtags/entities/mtag.entity';
import { Column, CreateDateColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Clientbrand {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  finishDate?: Date;

  @ManyToOne(() => Brand, brand => brand.clients, { onDelete: "CASCADE", nullable: true })
  brand: Brand;

  @RelationId((clientBrand: Clientbrand) => clientBrand.brand)
  brandID: string;

  @ManyToOne(() => Client, client => client.brands, { onDelete: "CASCADE", nullable: true })
  client: Client;

  @RelationId((clientBrand: Clientbrand) => clientBrand.client)
  clientID: string;

  @ManyToMany(() => Mtag, segment => segment.clients, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  mtags: Mtag[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
