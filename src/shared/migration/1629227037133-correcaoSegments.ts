import {MigrationInterface, QueryRunner} from "typeorm";

export class correcaoSegments1629227037133 implements MigrationInterface {
    name = 'correcaoSegments1629227037133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_0f35656e26fda384971f1aa387d"`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_0f35656e26fda384971f1aa387d" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_0f35656e26fda384971f1aa387d"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_0f35656e26fda384971f1aa387d" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
