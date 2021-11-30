import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Research } from "src/modules/research/entities/research.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum PeopleGenreEnum {
    notBinary = '8255c1d4-9724-4410-9e12-70f00c551749',
    cisMan = '17a7d4fd-807a-412b-bd69-e16a96fc8727',
    cisWoman = 'eef66d75-9800-41c7-ab69-0ee57c027444',
    transMan = '5699c1a3-d0cb-438e-a4c3-508c06eb5a6b',
    transWoman = '5bc948ce-ac6c-4319-ae1c-105fe1ae4d6a'
}
registerEnumType(PeopleGenreEnum, {
    name: 'PeopleGenreEnum',
  });


@ObjectType()
@Entity('peopleGenre')
export default class PeopleGenre {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.peopleGenre)
    users: User[];

    @ManyToMany(() => Research, research => research.peopleGenres)
    researchs: Research[];

}