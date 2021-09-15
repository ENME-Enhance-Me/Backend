import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCommentsTable1631731872978 implements MigrationInterface {
    name = 'AddCommentsTable1631731872978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "researchId" uuid, CONSTRAINT "REL_fa0fc5a604000a406747cae394" UNIQUE ("researchId"), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_fa0fc5a604000a406747cae394e" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_fa0fc5a604000a406747cae394e"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
