import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRewardType1637740979085 implements MigrationInterface {
    name = 'AddRewardType1637740979085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" DROP COLUMN "type"`);
    }

}
