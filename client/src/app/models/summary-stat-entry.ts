import { autoserialize, autoserializeAs } from 'cerialize';

export class SummaryStatEntry {
    @autoserialize id: number;
    @autoserializeAs('stat_id') statId: number;
    @autoserialize key: string;
    @autoserialize value: string;
}