import { autoserialize, autoserializeAs } from 'cerialize';

export class Stat {
    @autoserializeAs('eval_date') evalDate: Date;
    @autoserialize percent: number;
    @autoserializeAs('stat_group') statGroup: string;
    @autoserialize user: string;
    @autoserialize max: number;
}