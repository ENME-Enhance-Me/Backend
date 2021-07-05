import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1624683487485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'UserName',
            type: 'varchar',
          },
          {
            name: 'Email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'Password',
            type: 'varchar',
          },
          {
            name: 'Created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'Updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
