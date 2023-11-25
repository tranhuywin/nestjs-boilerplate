import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700383330725 implements MigrationInterface {
  name = 'Migration1700383330725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "user_name" character varying NOT NULL,
                "password" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    /// create 1 million dummy user
    for (let i = 0; i < 1000000; i++) {
      await queryRunner.query(`
            INSERT INTO "user" ("user_name", "password") VALUES ('user${i}', 'password${i}')
          `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
