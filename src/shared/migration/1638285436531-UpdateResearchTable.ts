import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateResearchTable1638285436531 implements MigrationInterface {
    name = 'UpdateResearchTable1638285436531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "research" ADD "forLead" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "research" ADD "forClient" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "research" ADD "peoplegroup" character varying NOT NULL DEFAULT 'ALL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "peoplegroup"`);
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "forClient"`);
        await queryRunner.query(`ALTER TABLE "research" DROP COLUMN "forLead"`);
    }

}
