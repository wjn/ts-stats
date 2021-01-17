import { CsvFileReader } from './CsvFileReader';
import { dateStringToDate } from '../utils';
import { MatchOutcomes } from '../enums/MatchOutcomes';

type MatchDataTuple = [Date, string, string, number, number, MatchOutcomes, string];

export class MatchReader extends CsvFileReader<MatchDataTuple> {
  mapRow(row: string[]): MatchDataTuple {
    return [
      dateStringToDate(row[0]), // match date
      row[1], // Home Team
      row[2], // Away Team
      parseInt(row[3]), // Home Score
      parseInt(row[4]), // Away Score
      row[5] as MatchOutcomes, // Match Outcomes: 'H', 'A', 'D'
      row[6], // Referee
    ];
  }
}
