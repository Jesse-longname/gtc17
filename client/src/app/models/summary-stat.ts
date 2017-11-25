import { autoserialize, autoserializeAs } from 'cerialize';
import { SummaryStatEntry } from './summary-stat-entry';

export class SummaryStat {
    @autoserialize id: number;
    @autoserialize name: string;
    @autoserializeAs(SummaryStatEntry) entries: SummaryStatEntry[];
}