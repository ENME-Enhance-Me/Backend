import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientTable1625165119182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clients',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'FirstName',
                        type: 'varchar',
                    },
                    {
                        name: 'LastName',
                        type: 'varchar',
                    },
                    {
                        name: 'BirthDate',
                        type: 'timestamp',
                    },
                    {
                        name: 'Gender',
                        type: 'varchar',
                    },
                    {
                        name: 'Reputation',
                        type: 'integer',
                    },
                    {
                        name: 'userID',
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
        await queryRunner.dropTable('clients');
    }

}
