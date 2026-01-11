import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entities";
import { MatchStatus } from "../constants/constant";

@Entity('match')
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    home_score: number;

    @Column({ default: 0 })
    away_score: number;

    @Column()
    playedAt: Date;

    @ManyToOne(() => Team, team => team.homeMatches, { eager: true })
    @JoinColumn({ name: 'homeTeamId' })
    homeTeam: Team;

    @ManyToOne(() => Team, team => team.awayMatches, { eager: true })
    @JoinColumn({ name: 'awayTeamId' })
    awayTeam: Team;

    @Column({
        type: 'enum',
        enum: MatchStatus,
        default: MatchStatus.PENDING
    })
    status: MatchStatus;
}