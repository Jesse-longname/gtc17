import { autoserialize, autoserializeAs } from 'cerialize';
import { StatGroup } from './stat-group';

export class Stat {
    @autoserializeAs('eval_date') evalDate: Date;
    @autoserialize percent: number;
    @autoserializeAs(StatGroup, 'stat_group') statGroup: StatGroup;
    @autoserialize user: string;
    @autoserializeAs('max_val') max: number;
}