import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserIDFKtoBrand1624687727023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'brand',
      new TableColumn({
        name: 'userID',
        type: 'varchar',
      }),
    );
    await queryRunner.createForeignKey(
      'brand',
      new TableForeignKey({
        name: 'userFK',
        columnNames: ['userID'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('brand', 'userFK');
    await queryRunner.dropColumn('brand', 'userID');
  }
}
