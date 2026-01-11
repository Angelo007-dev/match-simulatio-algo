import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1767956559390 implements MigrationInterface {
    name = 'CreateUserTable1767956559390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`team\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(25) NOT NULL, \`country\` varchar(50) NULL, \`points\` int NOT NULL, \`goalDifferrence\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`match\` (\`id\` int NOT NULL AUTO_INCREMENT, \`home_score\` int NOT NULL, \`away_score\` int NOT NULL, \`playedAt\` datetime NOT NULL, \`status\` enum ('pending', 'played') NOT NULL DEFAULT 'pending', \`homeTeamId\` int NULL, \`awayTeamId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`match\` ADD CONSTRAINT \`FK_5caac1768e2f5b7b9c69b62090c\` FOREIGN KEY (\`homeTeamId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`match\` ADD CONSTRAINT \`FK_07f5b02809e195be415834ed78a\` FOREIGN KEY (\`awayTeamId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`match\` DROP FOREIGN KEY \`FK_07f5b02809e195be415834ed78a\``);
        await queryRunner.query(`ALTER TABLE \`match\` DROP FOREIGN KEY \`FK_5caac1768e2f5b7b9c69b62090c\``);
        await queryRunner.query(`DROP TABLE \`match\``);
        await queryRunner.query(`DROP TABLE \`team\``);
    }

}
