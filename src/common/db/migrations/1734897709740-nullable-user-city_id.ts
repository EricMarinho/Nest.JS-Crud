import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableUserCityId1734897709740 implements MigrationInterface {
    name = 'NullableUserCityId1734897709740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "city_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "city_id" SET NOT NULL`);
    }

}
