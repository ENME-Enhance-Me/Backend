import {MigrationInterface, QueryRunner} from "typeorm";

export class setAddressToUsers1628255468823 implements MigrationInterface {
    name = 'setAddressToUsers1628255468823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_6e6c7c79fbf5ab39520cd1723e2" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "UQ_0f35656e26fda384971f1aa387d" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_0f35656e26fda384971f1aa387d" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_0f35656e26fda384971f1aa387d"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "UQ_0f35656e26fda384971f1aa387d"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "addressId"`);
    }

}
