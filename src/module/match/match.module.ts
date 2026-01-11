import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entities';
import { Team } from 'src/entities/team.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Team]),
  ],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule { }
