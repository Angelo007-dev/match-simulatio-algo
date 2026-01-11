import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MatchStatus } from "src/constants/constant";

export class MatchCreateDto {
    @IsInt()
    home_score: number;

    @IsInt()
    away_score: number;

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