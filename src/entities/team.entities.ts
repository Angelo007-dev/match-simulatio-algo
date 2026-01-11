import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match.entities";

@Entity('team')
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    name: string;

    @Column({ length: 50, nullable: true })
    country: string;

    @Column({ default: 0 })
    points: number;

    @Column({ default: 0 })
    goalDifferrence: number;

    @OneToMany(() => Match, match => match.homeTeam)
    homeMatches: Match[];

    @OneToMany(() => Match, match => match.awayTeam)
    awayMatches: Match[];

}