import {MigrationInterface, QueryRunner} from "typeorm";

export class ResearchTable1629406484359 implements MigrationInterface {
    name = 'ResearchTable1629406484359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_0f35656e26fda384971f1aa387d"`);
        await queryRunner.query(`CREATE TABLE "research" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "brandId" uuid, CONSTRAINT "PK_be0614c6e72bbe071af7b1b3586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "research" ADD CONSTRAINT "FK_266f27abe75301f03ac57122b98" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_0f35656e26fda384971f1aa387d" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_0f35656e26fda384971f1aa387d"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`ALTER TABLE "research" DROP CONSTRAINT "FK_266f27abe75301f03ac57122b98"`);
        await queryRunner.query(`DROP TABLE "research"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_0f35656e26fda384971f1aa387d" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
