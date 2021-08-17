import {MigrationInterface, QueryRunner} from "typeorm";

export class createSegmentsTable1626987569650 implements MigrationInterface {
    name = 'createSegmentsTable1626987569650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "macrosegment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f2aedfd86ab2abb8de636ea6702" UNIQUE ("name"), CONSTRAINT "PK_0716120e6729a1b0a6b5607f20e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "microsegment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c9bfd4d93d9cea5db7508fa4fa5" UNIQUE ("name"), CONSTRAINT "PK_d3c36019a17914e7737907a5269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_segments_microsegment" ("clientId" uuid NOT NULL, "microsegmentId" uuid NOT NULL, CONSTRAINT "PK_dab6ed3dbfbd429b0021ff1c186" PRIMARY KEY ("clientId", "microsegmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9512d26d40a474fb0cfe436ea8" ON "client_segments_microsegment" ("clientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f5d857e18032324baa5f36e74" ON "client_segments_microsegment" ("microsegmentId") `);
        await queryRunner.query(`CREATE TABLE "microsegment_macro_segments_macrosegment" ("microsegmentId" uuid NOT NULL, "macrosegmentId" uuid NOT NULL, CONSTRAINT "PK_7b6c2226358a25f66b6cb6f6937" PRIMARY KEY ("microsegmentId", "macrosegmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cea3e8da9502edc3be872611ec" ON "microsegment_macro_segments_macrosegment" ("microsegmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_08357f20ec636fda859ae52feb" ON "microsegment_macro_segments_macrosegment" ("macrosegmentId") `);
        await queryRunner.query(`CREATE TABLE "brand_segments_microsegment" ("brandId" uuid NOT NULL, "microsegmentId" uuid NOT NULL, CONSTRAINT "PK_1dc26e131ee895226522264e536" PRIMARY KEY ("brandId", "microsegmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_da8e3c343aff2dcf73d2353f32" ON "brand_segments_microsegment" ("brandId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02e9790ea33bc3cc77b4791f61" ON "brand_segments_microsegment" ("microsegmentId") `);
        await queryRunner.query(`ALTER TABLE "client_segments_microsegment" ADD CONSTRAINT "FK_9512d26d40a474fb0cfe436ea8e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_segments_microsegment" ADD CONSTRAINT "FK_3f5d857e18032324baa5f36e749" FOREIGN KEY ("microsegmentId") REFERENCES "microsegment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "microsegment_macro_segments_macrosegment" ADD CONSTRAINT "FK_cea3e8da9502edc3be872611ec0" FOREIGN KEY ("microsegmentId") REFERENCES "microsegment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "microsegment_macro_segments_macrosegment" ADD CONSTRAINT "FK_08357f20ec636fda859ae52feb6" FOREIGN KEY ("macrosegmentId") REFERENCES "macrosegment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand_segments_microsegment" ADD CONSTRAINT "FK_da8e3c343aff2dcf73d2353f32a" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brand_segments_microsegment" ADD CONSTRAINT "FK_02e9790ea33bc3cc77b4791f613" FOREIGN KEY ("microsegmentId") REFERENCES "microsegment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_segments_microsegment" DROP CONSTRAINT "FK_02e9790ea33bc3cc77b4791f613"`);
        await queryRunner.query(`ALTER TABLE "brand_segments_microsegment" DROP CONSTRAINT "FK_da8e3c343aff2dcf73d2353f32a"`);
        await queryRunner.query(`ALTER TABLE "microsegment_macro_segments_macrosegment" DROP CONSTRAINT "FK_08357f20ec636fda859ae52feb6"`);
        await queryRunner.query(`ALTER TABLE "microsegment_macro_segments_macrosegment" DROP CONSTRAINT "FK_cea3e8da9502edc3be872611ec0"`);
        await queryRunner.query(`ALTER TABLE "client_segments_microsegment" DROP CONSTRAINT "FK_3f5d857e18032324baa5f36e749"`);
        await queryRunner.query(`ALTER TABLE "client_segments_microsegment" DROP CONSTRAINT "FK_9512d26d40a474fb0cfe436ea8e"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_0f35656e26fda384971f1aa387d"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`DROP INDEX "IDX_02e9790ea33bc3cc77b4791f61"`);
        await queryRunner.query(`DROP INDEX "IDX_da8e3c343aff2dcf73d2353f32"`);
        await queryRunner.query(`DROP TABLE "brand_segments_microsegment"`);
        await queryRunner.query(`DROP INDEX "IDX_08357f20ec636fda859ae52feb"`);
        await queryRunner.query(`DROP INDEX "IDX_cea3e8da9502edc3be872611ec"`);
        await queryRunner.query(`DROP TABLE "microsegment_macro_segments_macrosegment"`);
        await queryRunner.query(`DROP INDEX "IDX_3f5d857e18032324baa5f36e74"`);
        await queryRunner.query(`DROP INDEX "IDX_9512d26d40a474fb0cfe436ea8"`);
        await queryRunner.query(`DROP TABLE "client_segments_microsegment"`);
        await queryRunner.query(`DROP TABLE "microsegment"`);
        await queryRunner.query(`DROP TABLE "macrosegment"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_0f35656e26fda384971f1aa387d" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
