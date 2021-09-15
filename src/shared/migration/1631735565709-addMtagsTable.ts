import {MigrationInterface, QueryRunner} from "typeorm";

export class addMtagsTable1631735565709 implements MigrationInterface {
    name = 'addMtagsTable1631735565709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mtags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "brandId" uuid, CONSTRAINT "PK_5cbb8aa2c43015fa8319c07dc89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questionOptions" ADD "mTagId" uuid`);
        await queryRunner.query(`ALTER TABLE "mtags" ADD CONSTRAINT "FK_641a6ec64baf95f7dadcc473230" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionOptions" ADD CONSTRAINT "FK_a43b2192d94e2939e48d1f1a08c" FOREIGN KEY ("mTagId") REFERENCES "mtags"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questionOptions" DROP CONSTRAINT "FK_a43b2192d94e2939e48d1f1a08c"`);
        await queryRunner.query(`ALTER TABLE "mtags" DROP CONSTRAINT "FK_641a6ec64baf95f7dadcc473230"`);
        await queryRunner.query(`ALTER TABLE "questionOptions" DROP COLUMN "mTagId"`);
        await queryRunner.query(`DROP TABLE "mtags"`);
    }

}
