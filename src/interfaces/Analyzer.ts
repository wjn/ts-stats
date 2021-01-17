import { MatchDataTuple } from '../typings/MatchDataTuple';

export interface Analyzer {
  run(matches: MatchDataTuple[]): string;
}
