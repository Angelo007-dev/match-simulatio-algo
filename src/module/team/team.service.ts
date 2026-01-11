import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TeamCreateDto } from 'src/dto/team.create.dto';
import { Team } from 'src/entities/team.entities';
import { DataSource, QueryRunner, Repository } from 'typeorm';


@Injectable()
export class TeamService {

    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,

        @InjectRepository(Team)
        private readonly teamRepo: Repository<Team>,
    ) { }
    async createTeam(dtoTeamCreate: TeamCreateDto, req) {
        const team_data = dtoTeamCreate;
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const team = queryRunner.manager.create(Team, team_data);
            await queryRunner.manager.save(team);
            await queryRunner.commitTransaction();
            const saved_team = await queryRunner.manager.findOne(Team, {
                where: { id: team.id },
            });

            return saved_team;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('failed to create team');
        } finally {
            await queryRunner.release();
        }
    }
    async listTeam(req) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [teams, total] = await this.teamRepo
            .createQueryBuilder('team')
            .orderBy('team.points', 'DESC')
            .addOrderBy('team.goalDifferrence', 'DESC')
            .addOrderBy('team.name', 'ASC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return {
            data: teams,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

}
