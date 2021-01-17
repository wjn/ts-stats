import { MatchColumnKeys } from '../../enums/MatchColumnKeys';
import { MatchOutcomes } from '../../enums/MatchOutcomes';
import { Analyzer } from '../../interfaces';
import { MatchDataTuple } from '../../typings/MatchDataTuple';

export class WinsAnalysis implements Analyzer {
  constructor(public teamName: string) {}
  run(matches: MatchDataTuple[]): string {
    let wins = 0;

    matches.map((row) => {
      switch (row[MatchColumnKeys.Outcome]) {
        case MatchOutcomes.HomeWin: {
          if (row[MatchColumnKeys.HomeTeam] === this.teamName) {
            wins++;
          }
          break;
        }
        case MatchOutcomes.AwayWin: {
          if (row[MatchColumnKeys.AwayTeam] === this.teamName) {
            wins++;
          }
          break;
        }
      }
    });
    return `${this.teamName} won ${wins} games.`;
  }
}
