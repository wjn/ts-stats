import fs from 'fs';

export abstract class CsvFileReader<T> {
  data: T[] = [];
  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T;

  read(): void {
    // prettier-ignore
    this.data = fs
      .readFileSync(this.filename, { encoding: 'utf-8' }) // reads file returns string
      .split('\n') // creates rows as string
      .map((row: string) : string[] => row.split(','))
      .map(this.mapRow);
  }
}
