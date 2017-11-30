import { autoserialize, autoserializeAs } from 'cerialize';

export class Category {
    @autoserialize id: number;
    @autoserialize name: string;
}