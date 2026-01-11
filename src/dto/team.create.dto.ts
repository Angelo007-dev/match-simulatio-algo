import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TeamCreateDto {
    @IsString()
    name: string;

    @IsString()
    country: string;

    @IsInt()
    @IsOptional()
    point: number;

    @IsInt()
    @IsOptional()
    goalDifference: number;
}