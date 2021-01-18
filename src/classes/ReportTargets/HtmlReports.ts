import { OutputTarget } from '../../interfaces/OutputTarget';
import fs from 'fs';

export class HtmlReport implements OutputTarget {
  print(report: string): void {
    const html = `
      <div>
        <h1>Analysis Output</h1>
        <div>${report.split('\n').join('<br/>')}</div>
      </div>
    `;

    fs.writeFileSync('report.html', html);
  }
}
