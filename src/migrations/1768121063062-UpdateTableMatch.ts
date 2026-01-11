import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableMatch1768121063062 implements MigrationInterface {
    name = 'UpdateTableMatch1768121063062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`team\` CHANGE \`points\` \`points\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`team\` CHANGE \`goalDifferrence\` \`goalDifferrence\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`team\` CHANGE \`goalDifferrence\` \`goalDifferrence\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`team\` CHANGE \`points\` \`points\` int NOT NULL`);
    }

}
