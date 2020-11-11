import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1605043804714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`, // in that case first change field 'name' into 'title' in the `coffee.entity.ts` file !!!
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
    );
  }
}
