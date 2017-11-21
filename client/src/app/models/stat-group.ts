import { autoserialize } from 'cerialize';

export class StatGroup {
    @autoserialize id: number;
    @autoserialize name: string;
}