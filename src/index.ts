import fs from 'fs';

enum MatchOutcome {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D',
}

const matches = fs
  .readFileSync('football.csv', { encoding: 'utf-8' }) // reads file returns string
  .split('\n') // creates rows as string
  .map((row) => row.split(',')); // arrays columns

let manUnitedWins = 0;

matches.map((row) => {
  if (row[1] === 'Man United' && row[5] === MatchOutcome.HomeWin) {
    manUnitedWins++;
  } else if (row[2] === 'Man United' && row[5] === MatchOutcome.AwayWin) {
    manUnitedWins++;
  }
});

console.log(`Man United won ${manUnitedWins} games.`);
