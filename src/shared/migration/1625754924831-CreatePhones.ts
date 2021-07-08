import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePhones1625754924831 implements MigrationInterface {
    name = 'CreatePhones1625754924831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "userFK"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "userFKClients"`);
        await queryRunner.query(`CREATE TABLE "Phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "DDD" integer NOT NULL, "number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_faeb810fccf6808648c64d34830" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "UQ_c8345fecaf285404ec558483c41" UNIQUE ("company_name")`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "UQ_264b3a3679a13aff15d5ed4ffe3" UNIQUE ("CNPJ_CPF")`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "userID"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "userID" uuid`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "UQ_ce674ba718dd5c84ba067854d6c" UNIQUE ("userID")`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "PK_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "userID"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "userID" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_31cccd94b6c7d026af67cb96366" UNIQUE ("userID")`);
        await queryRunner.query(`ALTER TABLE "Phone" ADD CONSTRAINT "FK_b1099627a86382cf01537a010c3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_ce674ba718dd5c84ba067854d6c" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_31cccd94b6c7d026af67cb96366" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_31cccd94b6c7d026af67cb96366"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_ce674ba718dd5c84ba067854d6c"`);
        await queryRunner.query(`ALTER TABLE "Phone" DROP CONSTRAINT "FK_b1099627a86382cf01537a010c3"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_31cccd94b6c7d026af67cb96366"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "userID"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "userID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "PK_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "id" NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "UQ_ce674ba718dd5c84ba067854d6c"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "userID"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "userID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "UQ_264b3a3679a13aff15d5ed4ffe3"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "UQ_c8345fecaf285404ec558483c41"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "id" NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "Phone"`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "userFKClients" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "userFK" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
