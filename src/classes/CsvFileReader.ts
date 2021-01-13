import fs from 'fs';
import { dateStringToDate } from '../utils';
import { MatchOutcomes } from '../enums/MatchOutcomes';
export class CsvFileReader {
  data: string[][] = [];
  constructor(public filename: string) {}

  read(): void {
    // prettier-ignore
    this.data = fs
      .readFileSync(this.filename, { encoding: 'utf-8' }) // reads file returns string
      .split('\n') // creates rows as string
      .map((row: string) : string[] => row.split(','))
      .map((values: string[]) : any => {
        return [
          dateStringToDate(values[0]),  // match date
          values[1],                    // Home Team
          values[2],                    // Away Team
          parseInt(values[3]),          // Home Score
          parseInt(values[4]),          // Away Score
          values[5] as MatchOutcomes,   // Match Outcomes: 'H', 'A', 'D'
          values[6]                     // Referee
        ]
      });
  }
}
