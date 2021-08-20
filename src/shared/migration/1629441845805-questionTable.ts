import {MigrationInterface, QueryRunner} from "typeorm";

export class questionTable1629441845805 implements MigrationInterface {
    name = 'questionTable1629441845805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questiontype" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, CONSTRAINT "PK_39ac66f7b2e13c8bb3f0806a32f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numberQuestion" integer NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "researchId" uuid, "questionTypeId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_bb9d74ba1165e51f7b466167e32" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_03ba19afc44b5f7eb70c20944e9" FOREIGN KEY ("questionTypeId") REFERENCES "questiontype"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_03ba19afc44b5f7eb70c20944e9"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_bb9d74ba1165e51f7b466167e32"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "questiontype"`);
    }

}
