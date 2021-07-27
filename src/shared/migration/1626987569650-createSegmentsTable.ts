import {MigrationInterface, QueryRunner} from "typeorm";

export class createSegmentsTable1626987569650 implements MigrationInterface {
    name = 'createSegmentsTable1626987569650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "segment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "macroSegmentId" uuid, CONSTRAINT "UQ_9e0406598d248857fe96f5e929d" UNIQUE ("name"), CONSTRAINT "PK_d648ac58d8e0532689dfb8ad7ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_segments_segment" ("clientId" uuid NOT NULL, "segmentId" uuid NOT NULL, CONSTRAINT "PK_7750624bb161cd86d9b37bf4d93" PRIMARY KEY ("clientId", "segmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c71879bd1aad8497ef37e965d6" ON "client_segments_segment" ("clientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf18adb442c1d98e515bbd883f" ON "client_segments_segment" ("segmentId") `);
        await queryRunner.query(`CREATE TABLE "brand_segments_segment" ("brandId" uuid NOT NULL, "segmentId" uuid NOT NULL, CONSTRAINT "PK_00c12bd575cf7bbdb599bfa643f" PRIMARY KEY ("brandId", "segmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_12a3c075ce1688e68a9345ab89" ON "brand_segments_segment" ("brandId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b4830e0032b1ddbc4027bf3f0" ON "brand_segments_segment" ("segmentId") `);
        await queryRunner.query(`ALTER TABLE "segment" ADD CONSTRAINT "FK_334cf62009e5a449c3b2d0f6a25" FOREIGN KEY ("macroSegmentId") REFERENCES "segment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_segments_segment" ADD CONSTRAINT "FK_c71879bd1aad8497ef37e965d63" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_segments_segment" ADD CONSTRAINT "FK_cf18adb442c1d98e515bbd883f3" FOREIGN KEY ("segmentId") REFERENCES "segment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand_segments_segment" ADD CONSTRAINT "FK_12a3c075ce1688e68a9345ab89a" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brand_segments_segment" ADD CONSTRAINT "FK_6b4830e0032b1ddbc4027bf3f02" FOREIGN KEY ("segmentId") REFERENCES "segment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_segments_segment" DROP CONSTRAINT "FK_6b4830e0032b1ddbc4027bf3f02"`);
        await queryRunner.query(`ALTER TABLE "brand_segments_segment" DROP CONSTRAINT "FK_12a3c075ce1688e68a9345ab89a"`);
        await queryRunner.query(`ALTER TABLE "client_segments_segment" DROP CONSTRAINT "FK_cf18adb442c1d98e515bbd883f3"`);
        await queryRunner.query(`ALTER TABLE "client_segments_segment" DROP CONSTRAINT "FK_c71879bd1aad8497ef37e965d63"`);
        await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_334cf62009e5a449c3b2d0f6a25"`);
        await queryRunner.query(`DROP INDEX "IDX_6b4830e0032b1ddbc4027bf3f0"`);
        await queryRunner.query(`DROP INDEX "IDX_12a3c075ce1688e68a9345ab89"`);
        await queryRunner.query(`DROP TABLE "brand_segments_segment"`);
        await queryRunner.query(`DROP INDEX "IDX_cf18adb442c1d98e515bbd883f"`);
        await queryRunner.query(`DROP INDEX "IDX_c71879bd1aad8497ef37e965d6"`);
        await queryRunner.query(`DROP TABLE "client_segments_segment"`);
        await queryRunner.query(`DROP TABLE "segment"`);
    }

}
