import { Constant } from '../src/constants/constant';
import { FixtureCreator } from '../src/fixtureCreator';
import { Fixture } from '../src/models/fixture';
import { Match } from '../src/models/match';
import { Team } from '../src/models/team';
import { Week } from '../src/models/week';
const fixtureCreator = new FixtureCreator();

describe("Is Even ", () => {
    test("Check the util isEven function in FixtureCreator", () => {
        expect(fixtureCreator["isEven"](8)).toEqual(true);
        expect(fixtureCreator["isEven"](4)).toEqual(true);
    });
});


describe("Is Odd", () => {
    test("Check the util isOdd function in FixtureCreator", () => {
        expect(fixtureCreator["isOdd"](7)).toEqual(true);
        expect(fixtureCreator["isOdd"](3)).toEqual(true);
    });
});

describe("Week Model", () => {
    test("Check Week object from Week", () => {
        let week = new Week('Test Title',[]);
        expect(week.title).toEqual('Test Title');
    });
});

describe("Team Model", () => {
    test("Check Team object from Team", () => {
        let team = new Team('Manchester City F.C.');
        expect(team.name).toEqual('Manchester City F.C.');
    });
});

describe("Match Model", () => {
    test("Check Match object from Match", () => {
        let match = new Match('Chelsea', 'Liverpool');
        expect(match.away).toEqual('Liverpool');
        expect(match.home).toEqual('Chelsea');
    });
});

describe("Fixture Model", () => {
    test("Check Fixture object from Fixture", () => {
        let fixture = new Fixture();
        expect(fixture.weeks).toEqual([]);
    });
});

describe("Get Week Title", () => {
    test("Check week title function", () => {
        let title = fixtureCreator["getWeekTitle"](3);
        expect(title).toEqual("3" + Constant.MATCH_WEEK);
    })
})