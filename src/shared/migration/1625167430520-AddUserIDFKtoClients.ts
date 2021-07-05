import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddUserIDFKtoClients1625167430520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'clients',
            new TableForeignKey({
              name: 'userFKClients',
              columnNames: ['userID'],
              referencedTableName: 'user',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('clients', 'userFKClients');
    }

}
