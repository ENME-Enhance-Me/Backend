import {MigrationInterface, QueryRunner} from "typeorm";

export class createWinnerTable1634276053835 implements MigrationInterface {
    name = 'createWinnerTable1634276053835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "winners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qrCode" character varying, "clientId" uuid, "rewardId" uuid, CONSTRAINT "PK_45701ddf409cead5c6e92a12ce8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientbrand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isClient" boolean NOT NULL, "isVIP" boolean NOT NULL, "mCoins" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "brandId" uuid, "clientId" uuid, CONSTRAINT "PK_531b34109f4c63d8a14e41deaf3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientbrand_mtags_mtags" ("clientbrandId" uuid NOT NULL, "mtagsId" uuid NOT NULL, CONSTRAINT "PK_29f72993ae5fb0dd94f0714c611" PRIMARY KEY ("clientbrandId", "mtagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6cd2984829a26ec592b2d8ea1d" ON "clientbrand_mtags_mtags" ("clientbrandId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aea9a147ef3aedb6dd4fb7dde5" ON "clientbrand_mtags_mtags" ("mtagsId") `);
        await queryRunner.query(`ALTER TABLE "answers" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "winners" ADD CONSTRAINT "FK_dd18c5bc2d1a58c2e5dcabd9326" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "winners" ADD CONSTRAINT "FK_bdb06efcac2bde2f9dbc6e3f3a0" FOREIGN KEY ("rewardId") REFERENCES "rewards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clientbrand" ADD CONSTRAINT "FK_bcf02fc24c94210f6037067a950" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clientbrand" ADD CONSTRAINT "FK_ceb322f108c712787c7e467f547" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_94fbde05ca93d53329df794c9d6" FOREIGN KEY ("clientId") REFERENCES "clientbrand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b40fb171abab0123de61bd2f421" FOREIGN KEY ("clientId") REFERENCES "clientbrand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clientbrand_mtags_mtags" ADD CONSTRAINT "FK_6cd2984829a26ec592b2d8ea1d4" FOREIGN KEY ("clientbrandId") REFERENCES "clientbrand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clientbrand_mtags_mtags" ADD CONSTRAINT "FK_aea9a147ef3aedb6dd4fb7dde58" FOREIGN KEY ("mtagsId") REFERENCES "mtags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientbrand_mtags_mtags" DROP CONSTRAINT "FK_aea9a147ef3aedb6dd4fb7dde58"`);
        await queryRunner.query(`ALTER TABLE "clientbrand_mtags_mtags" DROP CONSTRAINT "FK_6cd2984829a26ec592b2d8ea1d4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b40fb171abab0123de61bd2f421"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_94fbde05ca93d53329df794c9d6"`);
        await queryRunner.query(`ALTER TABLE "clientbrand" DROP CONSTRAINT "FK_ceb322f108c712787c7e467f547"`);
        await queryRunner.query(`ALTER TABLE "clientbrand" DROP CONSTRAINT "FK_bcf02fc24c94210f6037067a950"`);
        await queryRunner.query(`ALTER TABLE "winners" DROP CONSTRAINT "FK_bdb06efcac2bde2f9dbc6e3f3a0"`);
        await queryRunner.query(`ALTER TABLE "winners" DROP CONSTRAINT "FK_dd18c5bc2d1a58c2e5dcabd9326"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "clientId"`);
        await queryRunner.query(`DROP INDEX "IDX_aea9a147ef3aedb6dd4fb7dde5"`);
        await queryRunner.query(`DROP INDEX "IDX_6cd2984829a26ec592b2d8ea1d"`);
        await queryRunner.query(`DROP TABLE "clientbrand_mtags_mtags"`);
        await queryRunner.query(`DROP TABLE "clientbrand"`);
        await queryRunner.query(`DROP TABLE "winners"`);
    }

}
