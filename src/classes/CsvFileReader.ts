import fs from 'fs';

export class CsvFileReader {
  data: string[][] = [];
  constructor(public filename: string) {}

  read(): void {
    // prettier-ignore
    this.data = fs
      .readFileSync(this.filename, { encoding: 'utf-8' }) // reads file returns string
      .split('\n') // creates rows as string
      .map((row: string) : string[] => row.split(','));
  }
}
