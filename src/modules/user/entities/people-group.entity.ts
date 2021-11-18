import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Research } from "src/modules/research/entities/research.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum PeopleGroupEnum {
    notBinary,
    cisMan,
    cisWoman,
    transMan,
    transWoman
}
registerEnumType(PeopleGroupEnum, {
    name: 'PeopleGroupEnum',
  });


@ObjectType()
@Entity('peopleGroup')
export default class PeopleGroup {
    @PrimaryGeneratedColumn('rowid')
    @Field()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.peopleGroup)
    users: User[];

    @ManyToMany(() => Research, research => research.peopleGroups)
    researchs: Research[];

}