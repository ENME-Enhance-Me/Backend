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
        await queryRunner.dropTable('clients');
    }

}