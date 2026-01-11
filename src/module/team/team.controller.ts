import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TeamCreateDto } from 'src/dto/team.create.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {

    constructor(
        private readonly teamService: TeamService,
    ) {

    }
    @Post('create-team')
    teamCreate(@Body() dtoTeamCreate: TeamCreateDto, @Req() req: Request) {
        return this.teamService.createTeam(dtoTeamCreate, req);
    }

    @Get('teams-ranking')
    getTeamRanking(@Req() req: Request) {
        return this.teamService.listTeam(req);
    }
}
