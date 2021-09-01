import {MigrationInterface, QueryRunner} from "typeorm";

export class addQuestionOptions1630522970838 implements MigrationInterface {
    name = 'addQuestionOptions1630522970838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questionOptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "image" character varying, "nextQuestion" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "questionId" uuid, CONSTRAINT "PK_984c6fb082b6851156d1eaa7c16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questionOptions" ADD CONSTRAINT "FK_a1503dbaccabc1f747f4f44e9f4" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questionOptions" DROP CONSTRAINT "FK_a1503dbaccabc1f747f4f44e9f4"`);
        await queryRunner.query(`DROP TABLE "questionOptions"`);
    }

}
