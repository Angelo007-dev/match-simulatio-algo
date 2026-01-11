import { IsInt } from "class-validator";

export class MatchValidateDto {
    @IsInt()
    home_score: number;

    @IsInt()
    away_score: number;
}