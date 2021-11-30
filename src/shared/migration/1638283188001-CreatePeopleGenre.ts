import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePeopleGenre1638283188001 implements MigrationInterface {
    name = 'CreatePeopleGenre1638283188001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "peopleGenre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e7f31625fd88afbb3afe0a6e8c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "research_people_genres_people_genre" ("researchId" uuid NOT NULL, "peopleGenreId" uuid NOT NULL, CONSTRAINT "PK_63c69146539e39ef4a48045c4bf" PRIMARY KEY ("researchId", "peopleGenreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec2b1d2edd03106c6c11ea8b62" ON "research_people_genres_people_genre" ("researchId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6091d0f907f087864ae8b974b4" ON "research_people_genres_people_genre" ("peopleGenreId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "peopleGenreId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ad37c946f020805872ac15838fd" FOREIGN KEY ("peopleGenreId") REFERENCES "peopleGenre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "research_people_genres_people_genre" ADD CONSTRAINT "FK_ec2b1d2edd03106c6c11ea8b62b" FOREIGN KEY ("researchId") REFERENCES "research"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "research_people_genres_people_genre" ADD CONSTRAINT "FK_6091d0f907f087864ae8b974b41" FOREIGN KEY ("peopleGenreId") REFERENCES "peopleGenre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "research_people_genres_people_genre" DROP CONSTRAINT "FK_6091d0f907f087864ae8b974b41"`);
        await queryRunner.query(`ALTER TABLE "research_people_genres_people_genre" DROP CONSTRAINT "FK_ec2b1d2edd03106c6c11ea8b62b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ad37c946f020805872ac15838fd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "peopleGenreId"`);
        await queryRunner.query(`DROP INDEX "IDX_6091d0f907f087864ae8b974b4"`);
        await queryRunner.query(`DROP INDEX "IDX_ec2b1d2edd03106c6c11ea8b62"`);
        await queryRunner.query(`DROP TABLE "research_people_genres_people_genre"`);
        await queryRunner.query(`DROP TABLE "peopleGenre"`);
    }

}
