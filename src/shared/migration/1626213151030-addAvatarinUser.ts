import {MigrationInterface, QueryRunner} from "typeorm";

export class addAvatarinUser1626213151030 implements MigrationInterface {
    name = 'addAvatarinUser1626213151030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
