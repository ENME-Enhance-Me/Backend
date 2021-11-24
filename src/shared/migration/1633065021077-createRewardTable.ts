import {MigrationInterface, QueryRunner} from "typeorm";

export class createRewardTable1633065021077 implements MigrationInterface {
    name = 'createRewardTable1633065021077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rewards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "brandId" uuid, CONSTRAINT "PK_3d947441a48debeb9b7366f8b8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD CONSTRAINT "FK_21fe4ffc8245329248163302c79" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" DROP CONSTRAINT "FK_21fe4ffc8245329248163302c79"`);
        await queryRunner.query(`DROP TABLE "rewards"`);
    }

}
