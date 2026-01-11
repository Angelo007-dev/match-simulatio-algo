import { Test, TestingModule } from "@nestjs/testing";
import { MatchService } from "./match.service";
import { DataSource } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Match } from "../../entities/match.entities";
import { Team } from "../../entities/team.entities";
import { MatchCreateDto } from "../../dto/macth.create.dto";
import { MatchStatus } from "../../constants/constant";
import { BadRequestException } from "@nestjs/common";

const mockQuerryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
        create: jest.fn(),
        save: jest.fn(),
    }
};

const mockDataSource = {
    createQueryRunner: jest.fn(() => mockQuerryRunner),
};

const mockTeamRepo = {
    findOneBy: jest.fn(),
};

describe('MatchService', () => {
    let service: MatchService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MatchService,
                {
                    provide: DataSource,
                    useValue: mockDataSource
                },
                {
                    provide: getRepositoryToken(Match),
                    useValue: {}
                },
                {
                    provide: getRepositoryToken(Team),
                    useValue: mockTeamRepo
                },
            ],
        }).compile();
        service = module.get<MatchService>(MatchService);

        jest.clearAllMocks();
    });
    /*  it('throw new BadRequestException if same team', async () => {
          const dto: MatchCreateDto = {
              away_score: 0,
              awayTeamId: 4,
              home_score: 0,
              homeTeamId: 4,
              playedAt: new Date(),
              status: MatchStatus.PENDING
          }
          await expect(service.matchCreate(dto, {}))
              .rejects
              .toThrow(BadRequestException)
      })
  */
    it('should create match successfully', async () => {
        const homeTeam = { id: 4 };
        const awayTeam = { id: 3 };

        mockTeamRepo.findOneBy
            .mockResolvedValueOnce(homeTeam)
            .mockResolvedValueOnce(awayTeam);

        mockQuerryRunner.manager.create.mockReturnValue({ id: 10 });
        mockQuerryRunner.manager.save.mockReturnValue({ id: 10 });

        const dto: MatchCreateDto = {
            away_score: 0,
            awayTeamId: 4,
            home_score: 0,
            homeTeamId: 3,
            playedAt: new Date(),
            status: MatchStatus.PENDING
        }
        const result = await service.matchCreate(dto, {});

        expect(mockQuerryRunner.startTransaction).toHaveBeenCalled();
        expect(mockQuerryRunner.commitTransaction).toHaveBeenCalled();
        //expect(mockQuerryRunner.rollbackTransaction).toHaveBeenCalled();
        expect(mockQuerryRunner.release).toHaveBeenCalled();
    })
});

