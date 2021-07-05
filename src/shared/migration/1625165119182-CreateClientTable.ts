import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientTable1625165119182 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'client',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'firstname',
            type: 'varchar',
          },
          {
            name: 'lastname',
            type: 'varchar',
          },
          {
            name: 'birthdate',
            type: 'timestamp',
          },
          {
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'reputation',
            type: 'integer',
          },
          {
            name: 'userID',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('client');
  }

}
