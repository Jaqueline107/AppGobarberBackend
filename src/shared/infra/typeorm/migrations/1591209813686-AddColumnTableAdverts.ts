import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnTableAdverts1591209813686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'adverts',
      new TableColumn({
        name: 'advert_area',
        type: 'integer',
        default: 2000,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('adverts', 'advert_area');
  }
}
