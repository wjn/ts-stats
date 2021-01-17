import { OutputTarget } from '../../interfaces';
export class ConsoleReport implements OutputTarget {
  print(report: string): void {
    console.log(report);
  }
}
