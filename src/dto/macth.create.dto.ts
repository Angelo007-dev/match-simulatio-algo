import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MatchStatus } from "src/constants/constant";

export class MatchCreateDto {
    @IsInt()
    home_score: number = 0;

    @IsInt()
    away_score: number = 0;

    @IsInt()
    @IsNotEmpty()
    homeTeamId: number;

    @IsInt()
    @IsNotEmpty()
    awayTeamId: number;

    @IsDate()
    playedAt: Date;

    @IsEnum(MatchStatus)
    status: MatchStatus = MatchStatus.PENDING;
}