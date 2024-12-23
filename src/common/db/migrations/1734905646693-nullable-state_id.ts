import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableStateId1734905646693 implements MigrationInterface {
    name = 'NullableStateId1734905646693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Cities" ALTER COLUMN "state_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Cities" ALTER COLUMN "state_id" SET NOT NULL`);
    }

}
