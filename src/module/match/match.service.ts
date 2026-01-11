import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { MatchStatus } from '../../constants/constant';
import { MatchCreateDto } from '../../dto/macth.create.dto';
import { MatchValidateDto } from '../../dto/match.validate.dto';
import { Match } from '../../entities/match.entities';
import { Team } from '../../entities/team.entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MatchService {

    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,

        @InjectRepository(Match)
        private readonly matchRepo: Repository<Match>,

        @InjectRepository(Team)
        private readonly teamRepo: Repository<Team>,
    ) {


    }

    async matchCreate(dtoMatchCreate: MatchCreateDto, req) {
        if (dtoMatchCreate.homeTeamId === dtoMatchCreate.awayTeamId) {
            throw new BadRequestException(
                'A team cannot play against itself',
            );
        }

        const homeTeam = await this.teamRepo.findOneBy({ id: dtoMatchCreate.homeTeamId });
        const awayTeam = await this.teamRepo.findOneBy({ id: dtoMatchCreate.awayTeamId });

        if (!homeTeam || !awayTeam) {
            throw new NotFoundException('Team not found');
        }

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const match = queryRunner.manager.create(Match, {
                home_score: dtoMatchCreate.home_score,
                away_score: dtoMatchCreate.away_score,
                playedAt: dtoMatchCreate.playedAt,
                status: dtoMatchCreate.status ?? MatchStatus.PENDING,
                homeTeam,
                awayTeam,
            });

            const savedMatch = await queryRunner.manager.save(Match, match);

            await queryRunner.commitTransaction();

            return savedMatch;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('failed to create match');
        } finally {
            await queryRunner.release();
        }
    }

    async validatMatch(match_validate_dto: MatchValidateDto, match_id: number, req) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const match = await queryRunner.manager.findOne(Match, {
                where: { id: match_id },
                relations: ['homeTeam', 'awayTeam']
            });

            if (!match) throw new NotFoundException('match not found');

            if (match.status === MatchStatus.PLAYED) {
                throw new BadRequestException('match already played');
            }

            const { home_score, away_score } = match_validate_dto;

            if (home_score < 0 || away_score < 0) throw new BadRequestException('score cannot be negative');

            //update match
            match.home_score = home_score;
            match.away_score = away_score;
            match.status = MatchStatus.PLAYED;

            const homeTeam = match.homeTeam;
            const awayTeam = match.awayTeam;

            //goal difference
            const home_goal_diff = home_score - away_score;
            const away_goal_diff = away_score - home_score;

            homeTeam.goalDifferrence += home_goal_diff;
            awayTeam.goalDifferrence += away_goal_diff;

            //point attribution
            if (home_score > away_score) {
                homeTeam.points += 3;
            } else if (home_score < away_score) {
                awayTeam.points = +3;
            } else {
                homeTeam.points += 1;
                awayTeam.points += 1;
            }
            await queryRunner.manager.save(Match, match);
            await queryRunner.manager.save(Team, [homeTeam, awayTeam]);

            await queryRunner.commitTransaction();
            return {
                message: 'Macth validate successfylly',
                match,
            };
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('failed to validate match');
        } finally {
            await queryRunner.release();
        }
    }
}
