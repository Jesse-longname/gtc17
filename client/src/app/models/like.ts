import { autoserialize, autoserializeAs } from 'cerialize';
import { User } from './user';

export class Like {
    @autoserialize id: number;
    @autoserialize date: Date;
    @autoserializeAs(User) user: User;
    @autoserializeAs('post_id') postId: number;
}