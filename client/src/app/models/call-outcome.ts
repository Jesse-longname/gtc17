import { autoserialize, autoserializeAs } from 'cerialize';

export class CallOutcome {
    @autoserialize id: number;
    @autoserialize name: string;
    @autoserializeAs('icon_name') iconName: string;
}