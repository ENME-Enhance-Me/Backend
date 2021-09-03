import {MigrationInterface, QueryRunner} from "typeorm";

export class addAnswerTable1630659366827 implements MigrationInterface {
    name = 'addAnswerTable1630659366827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "questionOptionId" uuid, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_15e28903113d339bac804f59963" FOREIGN KEY ("questionOptionId") REFERENCES "questionOptions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_15e28903113d339bac804f59963"`);
        await queryRunner.query(`DROP TABLE "answers"`);
    }

}
