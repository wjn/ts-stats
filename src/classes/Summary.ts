import { Analyzer, OutputTarget } from '../interfaces';
import { MatchDataTuple } from '../typings/MatchDataTuple';

export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  buildAndPrintReport(matches: MatchDataTuple[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }
}
