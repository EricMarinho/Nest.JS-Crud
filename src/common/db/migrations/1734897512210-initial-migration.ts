import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1734897512210 implements MigrationInterface {
    name = 'InitialMigration1734897512210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "States" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "abbreviation" character varying NOT NULL, "fun_fact" character varying, "citiesId" uuid, CONSTRAINT "PK_4a6724bf35d29e122d0cb0eb313" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Cities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "state_id" character varying NOT NULL, "stateId" uuid, CONSTRAINT "PK_21ae4232868104702703893428e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "city_id" character varying NOT NULL, "cityId" uuid, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "States" ADD CONSTRAINT "FK_06a5e5b1d2af3be2ccd7d0a114d" FOREIGN KEY ("citiesId") REFERENCES "Cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Cities" ADD CONSTRAINT "FK_daa4b1f8186660f70b937064db0" FOREIGN KEY ("stateId") REFERENCES "States"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_7d51cf730407bf891b5e146ce9b" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_7d51cf730407bf891b5e146ce9b"`);
        await queryRunner.query(`ALTER TABLE "Cities" DROP CONSTRAINT "FK_daa4b1f8186660f70b937064db0"`);
        await queryRunner.query(`ALTER TABLE "States" DROP CONSTRAINT "FK_06a5e5b1d2af3be2ccd7d0a114d"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Cities"`);
        await queryRunner.query(`DROP TABLE "States"`);
    }

}
