import { autoserialize, autoserializeAs } from 'cerialize';

export class User {
    @autoserialize id: number;
    @autoserialize username: string;
    @autoserializeAs('first_name') firstName: string;
    @autoserializeAs('last_name') lastName: string;
    @autoserialize location: string;
    @autoserialize bio: string;
    @autoserializeAs('image_url') imageURL: string;
}