import { MatchColumnKeys } from '../../enums/MatchColumnKeys';
import { MatchOutcomes } from '../../enums/MatchOutcomes';
import { Analyzer } from '../../interfaces';
import { MatchDataTuple } from '../../typings/MatchDataTuple';

type WinsByTeam = {
  [key: string]: number;
};

export class MostWins implements Analyzer {
  public winsByTeam: WinsByTeam = {};

  private incrementWins(teamName: string): void {
    if (!this.winsByTeam.hasOwnProperty(teamName)) {
      // initialize team property and wins count if none exists.
      this.winsByTeam[teamName] = 0;
    }
    this.winsByTeam[teamName]++;
  }

  run(matches: MatchDataTuple[]): string {
    matches.map((row) => {
      const homeTeam = row[MatchColumnKeys.HomeTeam];
      const awayTeam = row[MatchColumnKeys.AwayTeam];
      switch (row[MatchColumnKeys.Outcome]) {
        case MatchOutcomes.HomeWin: {
          this.incrementWins(homeTeam);
          break;
        }
        case MatchOutcomes.AwayWin: {
          this.incrementWins(awayTeam);
          break;
        }
      }
    });

    const winingestTeam = Object.keys(this.winsByTeam).reduce((a, b) =>
      this.winsByTeam[a] > this.winsByTeam[b] ? a : b
    );

    return `${winingestTeam} won the most matches with ${this.winsByTeam[winingestTeam]} wins.`;
  }
}
