import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1768138299031 implements MigrationInterface {
    name = 'UpdateTable1768138299031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`match\` CHANGE \`home_score\` \`home_score\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`match\` CHANGE \`away_score\` \`away_score\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`match\` CHANGE \`away_score\` \`away_score\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`match\` CHANGE \`home_score\` \`home_score\` int NOT NULL`);
    }

}
