import { MostLosses } from './classes/Analyzers/MostLosses';
import { MostWins } from './classes/Analyzers/MostWins';
import { SeasonStandings } from './classes/Analyzers/SeasonStandings';
import { StatLeader } from './classes/Analyzers/StatLeader';
import { WinsAnalysis } from './classes/Analyzers/WinsAnalysis';
import { CsvFileReader } from './classes/CsvFileReader';
import { MatchReader } from './classes/MatchReader';
import { ConsoleReport } from './classes/ReportTargets/ConsoleReport';
import { Summary } from './classes/Summary';
import { Stats } from './enums/Stats';

// Identify the method and data to use
const csvFileReader = new CsvFileReader('football.csv');
// Process Football matches into an array of tuples
const matchReader = new MatchReader(csvFileReader);
matchReader.load();

// Run the analysis
const stat = Stats.wins;
const statLeader = new Summary(new StatLeader(stat), new ConsoleReport());
statLeader.buildAndPrintReport(matchReader.matches);

const standings = new Summary(new SeasonStandings(stat), new ConsoleReport());
standings.buildAndPrintReport(matchReader.matches);
