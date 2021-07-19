import {MigrationInterface, QueryRunner} from "typeorm";

export class logoBrand1626723666897 implements MigrationInterface {
    name = 'logoBrand1626723666897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e306d3d0e5fe9282b4705bf07d"`);
        await queryRunner.query(`ALTER TABLE "brand" RENAME COLUMN "avatar" TO "logo"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9e306d3d0e5fe9282b4705bf07d" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e306d3d0e5fe9282b4705bf07d"`);
        await queryRunner.query(`ALTER TABLE "brand" RENAME COLUMN "logo" TO "avatar"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9e306d3d0e5fe9282b4705bf07d" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
