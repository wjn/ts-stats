import { DataReader } from '../interfaces/DataReader';
import { dateStringToDate } from '../utils';
import { MatchOutcomes } from '../enums/MatchOutcomes';
import { MatchDataTuple } from '../typings/MatchDataTuple';
import { MatchColumnKeys } from '../enums/MatchColumnKeys';
import { CsvFileReader } from './CsvFileReader';

export class MatchReader {
  static fromCsv(filename: string): MatchReader {
    return new MatchReader(new CsvFileReader(filename));
  }

  public matches: MatchDataTuple[] = [];
  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read();
    this.matches = this.reader.data.map(
      (values: string[]): MatchDataTuple => {
        // will use TS tuples to guarantee order and type
        return [
          dateStringToDate(values[MatchColumnKeys.Date]), // match date
          values[MatchColumnKeys.HomeTeam], // Home Team
          values[MatchColumnKeys.AwayTeam], // Away Team
          parseInt(values[MatchColumnKeys.HomeScore]), // Home Score
          parseInt(values[MatchColumnKeys.AwayScore]), // Away Score
          values[MatchColumnKeys.Outcome] as MatchOutcomes, // Match Outcomes: 'H', 'A', 'D'
          values[MatchColumnKeys.Referee], // Referee
        ];
      }
    );
  }
}
