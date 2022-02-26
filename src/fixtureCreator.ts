import { Constant } from "./constants/constant";
import { Fixture } from "./models/fixture";
import { Match } from "./models/match";
import { Team } from "./models/team";
import { Week } from "./models/week";

export class FixtureCreator{
    public createLeagueFixture(teams:string[], byeTeamTextIsEnable:boolean = true) : Fixture{
        let validTeams = this.checkTeams(teams, byeTeamTextIsEnable);

        let teamsArray = this.createTwoDimensionalArray(validTeams);

        let weeks = this.createMatchWeeks(validTeams.length);

        let seasonFirstHalf = this.setSeasonsFirstHalfMatchWeeks(teamsArray, weeks);
        let seasonSecondHalf = this.setSeasonsSecondHalfMatchWeeks(seasonFirstHalf);

        return this.getFixture(seasonFirstHalf, seasonSecondHalf);
    }

    private getFixture(firstHalf:Week[], secondHalf:Week[]):Fixture{
        let fixture:Fixture = new Fixture();

        fixture.weeks = this.mergeSeasonsHalf(firstHalf, secondHalf);
        return fixture;
    }

    private mergeSeasonsHalf(firstHalf:Week[], secondHalf:Week[]):Week[]{
        let finalSeason = firstHalf.concat(secondHalf);
        return finalSeason;
    }

    private setSeasonsSecondHalfMatchWeeks(firstHalfWeek:Week[]){
        let seasonsSecondHalf: Week[] = [];

        firstHalfWeek.forEach((element, index) => {
            let tempWeek = new Week(this.getWeekTitle(firstHalfWeek.length + index + 1), []);
            let matches : Match[] = [];
            element.matches.forEach(m=>{
                let tempMatch : Match = new Match(m.away, m.home);
                matches.push(tempMatch);
            });

            tempWeek.matches = matches;
            seasonsSecondHalf.push(tempWeek);
        });
        return seasonsSecondHalf;
    }

    private setSeasonsFirstHalfMatchWeeks(teams: string[][], weeks: Week[]):Week[] {
        for (let i: number = 0; i < weeks.length; i++) {
            weeks[i].matches = [];
            let matches: Match[] = [];
            for (let j: number = 0; j < teams.length; j++) {
                for (let k: number = 0; k < teams[0].length; k++) {
                    let team: Team = new Team(teams[j][k]);
                    let match = new Match();
                    if (this.isEven(j)) {
                        match.home = team.name;
                        matches.push(match);
                    } else {
                        matches[k].away = team.name;
                    }
                }
            }
            weeks[i].matches = matches;

            teams = this.rotate2DArray(teams[0].length,teams[0], teams[1]);
        }

        return weeks;
    }

    private getWeekTitle(weekNumber:number):string{
        let title = weekNumber.toString() + Constant.MATCH_WEEK;
        return title;
    }

    private rotate2DArray(length:number, firstArr:string[], secondArr:string[]):string[][]{
        let rotatedTeams:string[][] = [];

        let firstArrayLastTeam = firstArr[length - 1];

        for (let i: number = length - 1; i > 1; i--) {
            firstArr[i] = firstArr[i -1];
        }
        firstArr[1] = secondArr[0];

        for (let i: number = 0; i < length - 1; i++) {
            secondArr[i] = secondArr[i + 1];
        }
        secondArr[length -1] = firstArrayLastTeam;

        rotatedTeams[0] = firstArr;
        rotatedTeams[1] = secondArr;

        return rotatedTeams;
    }

    private createMatchWeeks(teamCount:number):Week[]{
        let gameWeeks : Week[] = [];
        for(let i:number=0;i<teamCount - 1;i++){
            let week:Week = new Week(this.getWeekTitle((i + 1)),[]);
            gameWeeks.push(week);
        }
        return gameWeeks;
    }

    private checkTeams(teams:string[], byeTeamTextIsEnable:boolean){
        let shuffledTeams = this.shuffleTeams(teams);
        if(this.isOdd(shuffledTeams.length)){
            if(byeTeamTextIsEnable){
                shuffledTeams.push(Constant.BYE_TEAM);
            }else{
                shuffledTeams.push(Constant.DASH);
            }   
        }
        return shuffledTeams;
    }

    private createTwoDimensionalArray(teams:string[]) : string[][]{
        let twoDimensionalTeamsArray:string[][] = [];
        let column = teams.length / 2;
        let index = 0;

        for (var i: number = 0; i < 2; i++) {
            twoDimensionalTeamsArray[i] = [];
            for (var j: number = 0; j < column; j++) {
                twoDimensionalTeamsArray[i][j] = teams[index];
                index++;
            }
        }
        return twoDimensionalTeamsArray;
    }

    private shuffleTeams(teams:string[]) : string[]{
        for (let i = teams.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [teams[i], teams[j]] = [teams[j], teams[i]];
        }
        return teams;
    }

    private isEven(n : number) : boolean{
        return n % 2 == 0;
    }

    private isOdd(n : number) : boolean {
        return Math.abs(n % 2) == 1;
     }
}