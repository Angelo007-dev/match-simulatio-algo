import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { TeamService } from '../team/team.service';
import { MatchCreateDto } from 'src/dto/macth.create.dto';
import { MatchService } from './match.service';
import { MatchValidateDto } from 'src/dto/match.validate.dto';

@Controller('match')
export class MatchController {
    constructor(
        private readonly matchService: MatchService,
    ) {

    }
    @Post('create-match')
    matchCreate(@Body() dtoMatchCreate: MatchCreateDto, @Req() req: Request) {
        return this.matchService.matchCreate(dtoMatchCreate, req);
    }
    @Patch('/:match_id/validate')
    validateMatch(@Body() dtoMatchValidate: MatchValidateDto, @Param('match_id') matchId: number, @Req() req: Request) {
        return this.matchService.validatMatch(dtoMatchValidate, matchId, req);
    }
}
