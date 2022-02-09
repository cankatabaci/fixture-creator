import { Match } from "./match";

export class Week{
    title : string ;
    matches : Match[] = [];

    constructor(weekTitle:string, weekMatches:Match[]){
        this.title = weekTitle;
        this.matches = weekMatches;
    }
}