import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { MicroSegment } from "src/modules/micro-segments/entities/micro-segment.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('macrosegment')
@ObjectType()
export class MacroSegment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => MicroSegment, segment => segment.macroSegments, { nullable: true })
  microSegments: MicroSegment[];

  @CreateDateColumn()
  @HideField()
  created_at: Date;

  @UpdateDateColumn()
  @HideField()
  updated_at: Date;
}
