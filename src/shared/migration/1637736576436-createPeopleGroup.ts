import {MigrationInterface, QueryRunner} from "typeorm";

export class createPeopleGroup1637736576436 implements MigrationInterface {
    name = 'createPeopleGroup1637736576436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "peopleGroup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_7ddd6a09ce87752a60f5a0d9609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "research_people_groups_people_group" ("researchId" uuid NOT NULL, "peopleGroupId" uuid NOT NULL, CONSTRAINT "PK_0bba07cc3b3ac0c60bcb248d14a" PRIMARY KEY ("researchId", "peopleGroupId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ffee4521fcd38dbfe0b6d93ba0" ON "research_people_groups_people_group" ("researchId") `);
        await queryRunner.query(`CREATE INDEX "IDX_41880c252805c961881b06d2e3" ON "research_people_groups_people_group" ("peopleGroupId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "peopleGroupId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bb047808120e42981928c0ba18c" FOREIGN KEY ("peopleGroupId") REFERENCES "peopleGroup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "research_people_groups_people_group" ADD CONSTRAINT "FK_ffee4521fcd38dbfe0b6d93ba09" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "research_people_groups_people_group" ADD CONSTRAINT "FK_41880c252805c961881b06d2e3b" FOREIGN KEY ("peopleGroupId") REFERENCES "peopleGroup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "research_people_groups_people_group" DROP CONSTRAINT "FK_41880c252805c961881b06d2e3b"`);
        await queryRunner.query(`ALTER TABLE "research_people_groups_people_group" DROP CONSTRAINT "FK_ffee4521fcd38dbfe0b6d93ba09"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bb047808120e42981928c0ba18c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "peopleGroupId"`);
        await queryRunner.query(`DROP INDEX "IDX_41880c252805c961881b06d2e3"`);
        await queryRunner.query(`DROP INDEX "IDX_ffee4521fcd38dbfe0b6d93ba0"`);
        await queryRunner.query(`DROP TABLE "research_people_groups_people_group"`);
        await queryRunner.query(`DROP TABLE "peopleGroup"`);
    }

}
