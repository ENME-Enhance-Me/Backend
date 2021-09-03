import {MigrationInterface, QueryRunner} from "typeorm";

export class addCommentsTable1630668218840 implements MigrationInterface {
    name = 'addCommentsTable1630668218840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "answerId" uuid, "questionOptionId" uuid, CONSTRAINT "REL_192a303f8641f3eef18568e2f4" UNIQUE ("answerId"), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_192a303f8641f3eef18568e2f45" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_07a202bde1f82d9a18d6a9e9395" FOREIGN KEY ("questionOptionId") REFERENCES "questionOptions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_07a202bde1f82d9a18d6a9e9395"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_192a303f8641f3eef18568e2f45"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
