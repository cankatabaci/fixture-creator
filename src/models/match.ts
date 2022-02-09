import { Team } from "./team";

export class Match {
    home? : string;
    away? : string;

    constructor(homeTeam?:string, awayTeam?:string){
        this.home = homeTeam;
        this.away = awayTeam;
    }
}