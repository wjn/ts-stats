import { MatchColumnKeys } from '../../enums/MatchColumnKeys';
import { MatchOutcomes } from '../../enums/MatchOutcomes';
import { Analyzer } from '../../interfaces';
import { MatchDataTuple } from '../../typings/MatchDataTuple';

type LossesByTeam = {
  [key: string]: number;
};

export class MostLosses implements Analyzer {
  public lossesByTeam: LossesByTeam = {};

  private incrementLosses(teamName: string): void {
    if (!this.lossesByTeam.hasOwnProperty(teamName)) {
      // initialize team property and losses count if none exists.
      this.lossesByTeam[teamName] = 0;
    }
    this.lossesByTeam[teamName]++;
  }

  run(matches: MatchDataTuple[]): string {
    matches.map((row) => {
      const homeTeam = row[MatchColumnKeys.HomeTeam];
      const awayTeam = row[MatchColumnKeys.AwayTeam];
      switch (row[MatchColumnKeys.Outcome]) {
        case MatchOutcomes.HomeWin: {
          this.incrementLosses(awayTeam);
          break;
        }
        case MatchOutcomes.AwayWin: {
          this.incrementLosses(homeTeam);
          break;
        }
      }
    });

    const losingestTeam = Object.keys(this.lossesByTeam).reduce((a, b) =>
      this.lossesByTeam[a] > this.lossesByTeam[b] ? a : b
    );

    return `${losingestTeam} lost the most matches with ${this.lossesByTeam[losingestTeam]} losses.`;
  }
}
