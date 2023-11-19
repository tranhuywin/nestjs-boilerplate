import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700376464666 implements MigrationInterface {
  name = 'Migration1700376464666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "joke" (
                "id" SERIAL NOT NULL,
                "content" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_2178bf6d2debe372d439360892a" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "joke"
        `);
  }
}
