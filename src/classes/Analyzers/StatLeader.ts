import { MatchColumnKeys } from '../../enums/MatchColumnKeys';
import { MatchOutcomes } from '../../enums/MatchOutcomes';
import { Stats } from '../../enums/Stats';
import { Analyzer } from '../../interfaces';
import { MatchDataTuple } from '../../typings/MatchDataTuple';

type CountByTeam = {
  [key: string]: number;
};

export class StatLeader implements Analyzer {
  public countByTeam: CountByTeam = {};
  private statsLanguage = [
    ['wins', 'won'],
    ['losses', 'lost'],
    ['draws', 'tied'],
  ];

  constructor(private leaderOf: Stats = Stats.wins) {}

  private incrementStat(teamName: string): void {
    if (!this.countByTeam.hasOwnProperty(teamName)) {
      // initialize team property and wins count if none exists.
      this.countByTeam[teamName] = 0;
    }
    this.countByTeam[teamName]++;
  }

  run(matches: MatchDataTuple[]): string {
    matches.map((row) => {
      const homeTeam = row[MatchColumnKeys.HomeTeam];
      const awayTeam = row[MatchColumnKeys.AwayTeam];
      switch (row[MatchColumnKeys.Outcome]) {
        case MatchOutcomes.HomeWin: {
          if (this.leaderOf === Stats.wins) {
            this.incrementStat(homeTeam);
          } else if (this.leaderOf === Stats.losses) {
            this.incrementStat(awayTeam);
          }
          break;
        }
        case MatchOutcomes.AwayWin: {
          if (this.leaderOf === Stats.wins) {
            this.incrementStat(awayTeam);
          } else if (this.leaderOf === Stats.losses) {
            this.incrementStat(homeTeam);
          }
          break;
        }
        case MatchOutcomes.Draw: {
          if (this.leaderOf === Stats.draws) {
            this.incrementStat(homeTeam);
            this.incrementStat(awayTeam);
          }
          break;
        }
      }
    });

    const statLeader = Object.keys(this.countByTeam).reduce((a, b) =>
      this.countByTeam[a] > this.countByTeam[b] ? a : b
    );

    return `${statLeader} ${this.statsLanguage[this.leaderOf][1]} the most matches with ${
      this.countByTeam[statLeader]
    } ${this.statsLanguage[this.leaderOf][0]}.`;
  }
}
