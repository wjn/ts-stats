import { CsvFileReader } from './classes/CsvFileReader';
import { MatchOutcomes } from './enums/MatchOutcomes';

const reader = new CsvFileReader('football.csv');
reader.read();

let manUnitedWins = 0;

reader.data.map((row) => {
  if (row[1] === 'Man United' && row[5] === MatchOutcomes.HomeWin) {
    manUnitedWins++;
  } else if (row[2] === 'Man United' && row[5] === MatchOutcomes.AwayWin) {
    manUnitedWins++;
  }
});

console.log(`Man United won ${manUnitedWins} games.`);
