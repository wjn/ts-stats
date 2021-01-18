import { SeasonStandings } from './classes/Analyzers/SeasonStandings';
import { StatLeader } from './classes/Analyzers/StatLeader';
import { MatchReader } from './classes/MatchReader';
import { ConsoleReport } from './classes/ReportTargets/ConsoleReport';
import { HtmlReport } from './classes/ReportTargets/HtmlReports';
import { Summary } from './classes/Summary';
import { Stats } from './enums/Stats';

// Identify the method and data to use
const matchReader = MatchReader.fromCsv('football.csv');
// Process Football matches into an array of tuples
matchReader.load();

// Run the analysis
const stat = Stats.wins;
const statLeader = new Summary(new StatLeader(stat), new ConsoleReport());
statLeader.buildAndPrintReport(matchReader.matches);

const standings = new Summary(new SeasonStandings(stat), new ConsoleReport());
standings.buildAndPrintReport(matchReader.matches);
