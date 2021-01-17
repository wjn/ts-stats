import { MatchColumnKeys } from '../../enums/MatchColumnKeys';
import { MatchOutcomes } from '../../enums/MatchOutcomes';
import { Stats } from '../../enums/Stats';
import { Analyzer } from '../../interfaces';
import { MatchDataTuple } from '../../typings/MatchDataTuple';

type Standings = {
  [key: string]: [wins: number, losses: number, draws: number];
};

export class SeasonStandings implements Analyzer {
  public standings: Standings = {};

  constructor(private sortBy: Stats = Stats.wins) {}

  private sort(): void {
    // const sorted = Object.keys(this.standings).sort((a,b) => this.standings[b][stat] - this.standings[a][stat]);
    this.standings = Object.fromEntries(
      Object.entries(this.standings).sort(([, a], [, b]) => b[this.sortBy] - a[this.sortBy])
    );
  }

  private toString(): string {
    let output = '';

    for (const team in this.standings) {
      output += `${team}, W:${this.standings[team][Stats.wins]} | L:${this.standings[team][Stats.losses]} | D:${
        this.standings[team][Stats.draws]
      }\n`;
    }
    return output;
  }

  private updateStandings(teamName: string, stat: Stats): void {
    if (!this.standings.hasOwnProperty(teamName)) {
      // initialize team property and standings counts if none exists.
      this.standings[teamName] = [0, 0, 0];
    }
    this.standings[teamName][stat]++;
  }

  run(matches: MatchDataTuple[]): string {
    matches.map((row) => {
      const homeTeam = row[MatchColumnKeys.HomeTeam];
      const awayTeam = row[MatchColumnKeys.AwayTeam];

      switch (row[MatchColumnKeys.Outcome]) {
        case MatchOutcomes.HomeWin: {
          this.updateStandings(homeTeam, Stats.wins);
          this.updateStandings(awayTeam, Stats.losses);
          break;
        }
        case MatchOutcomes.AwayWin: {
          this.updateStandings(awayTeam, Stats.wins);
          this.updateStandings(homeTeam, Stats.losses);
          break;
        }
        case MatchOutcomes.Draw: {
          this.updateStandings(homeTeam, Stats.draws);
          this.updateStandings(awayTeam, Stats.draws);
        }
      }
    });

    this.sort();
    return this.toString();
  }
}
