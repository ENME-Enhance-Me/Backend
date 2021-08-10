import {MigrationInterface, QueryRunner} from "typeorm";

export class createAddressTable1627912341934 implements MigrationInterface {
    name = 'createAddressTable1627912341934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_334cf62009e5a449c3b2d0f6a25"`);
        await queryRunner.query(`CREATE TABLE "state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "stateId" uuid, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "neighborhood" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cityId" uuid, CONSTRAINT "PK_97797961be30242a5170d17caec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publicPlace" character varying NOT NULL, "number" integer, "complement" character varying NOT NULL, "CEP" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "neighborhoodId" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_e99de556ee56afe72154f3ed04a" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "neighborhood" ADD CONSTRAINT "FK_1640abb7a428c88d65b1df610ef" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_b015d504b3f933943a1f2451eb8" FOREIGN KEY ("neighborhoodId") REFERENCES "neighborhood"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "segment" ADD CONSTRAINT "FK_334cf62009e5a449c3b2d0f6a25" FOREIGN KEY ("macroSegmentId") REFERENCES "segment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_334cf62009e5a449c3b2d0f6a25"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_b015d504b3f933943a1f2451eb8"`);
        await queryRunner.query(`ALTER TABLE "neighborhood" DROP CONSTRAINT "FK_1640abb7a428c88d65b1df610ef"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_e99de556ee56afe72154f3ed04a"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "neighborhood"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`ALTER TABLE "segment" ADD CONSTRAINT "FK_334cf62009e5a449c3b2d0f6a25" FOREIGN KEY ("macroSegmentId") REFERENCES "segment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
