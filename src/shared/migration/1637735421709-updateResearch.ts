import {MigrationInterface, QueryRunner} from "typeorm";

export class updateResearch1637735421709 implements MigrationInterface {
    name = 'updateResearch1637735421709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "research" ADD "ageGroupStart" integer NOT NULL DEFAULT '18'`);
        await queryRunner.query(`ALTER TABLE "research" ADD "ageGroupEnd" integer`);
        await queryRunner.query(`ALTER TABLE "research" ADD "locationRange" integer NOT NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "locationRange"`);
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "ageGroupEnd"`);
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "ageGroupStart"`);
        await queryRunner.query(`ALTER TABLE "research" ADD "description" character varying`);
    }

}
