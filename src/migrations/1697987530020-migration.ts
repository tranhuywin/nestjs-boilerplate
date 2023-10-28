import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697987530020 implements MigrationInterface {
  name = 'Migration1697987530020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "joke" (
                "id" SERIAL NOT NULL,
                "content" text NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
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
