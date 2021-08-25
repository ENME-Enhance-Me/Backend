import {MigrationInterface, QueryRunner} from "typeorm";

export class attResarchandQuestion1629924791290 implements MigrationInterface {
    name = 'attResarchandQuestion1629924791290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" ADD "image" character varying NOT NULL DEFAULT 'https://res.cloudinary.com/enme/image/upload/v1629924117/enme/questionImage/padrao/banner-azul.jpg'`);
        await queryRunner.query(`ALTER TABLE "research" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "research" ADD "finishDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "finishDate"`);
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "image"`);
    }

}
