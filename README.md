# Fixture Creator
[![Build Status](https://app.travis-ci.com/cankatabaci/fixture-creator.svg?branch=main)](https://app.travis-ci.com/cankatabaci/fixture-creator)

_Round-robin tournament based sports fixture creator_<br />
 
## **Install**
```
npm i fixture-creator
```
### **Usage**
```ts
import { FixtureCreator } from "fixture-creator";

const teams:string[] = ['Barcelona', 'Bayern Munich', 'Galatasaray'];
const fixtureCreator = new FixtureCreator();

console.log(fixtureCreator.createLeagueFixture(teams));
```

`teams` should be a array of team names as a string<br />
`teams` must have at least 2 team<br />
if `teams` length is odd, the team that will not play that week is shown to face `'BYE-THIS-WEEK'`.<br />

`fixtureCreator.createLeagueFixture(teams)` returns fixture object. fixture object contains game weeks array.<br />

```
{
   "weeks":[
      {
         "title":"1. Match Week",
         "matches":[
            {
               "home":"Galatasaray",
               "away":"Barcelona"
            },
            {
               "home":"Bayern Munich",
               "away":"BYE-THIS-WEEK"
            }
         ]
      },
      {
         "title":"2. Match Week",
         "matches":[
            {
               "home":"Galatasaray",
               "away":"BYE-THIS-WEEK"
            },
            {
               "home":"Barcelona",
               "away":"Bayern Munich"
            }
         ]
      },
      {
          ...
          ...
      }
   ]
}
```

### Notes
> I developed this package to use in<br />
> FIFA tournaments that we play with our friends.<br />
> We play our FIFA tournament like a classic league<br />
> so it creates(by default) a fixture that includes the return matches.<br />

 