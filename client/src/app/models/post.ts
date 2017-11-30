import { autoserialize, autoserializeAs } from 'cerialize';
import { CallOutcome } from './call-outcome';
import { Category } from './category';
import { User } from './user-new';
import { Like } from './like';

export class Post {
    @autoserialize id: number;
    @autoserialize date: Date;
    @autoserializeAs(Like) likes: Like[] = [];
    @autoserialize content: string;
    @autoserializeAs(User) user: User = null;
    @autoserializeAs(Category) category: Category = null;
    @autoserializeAs(CallOutcome) outcome: CallOutcome = null;
    @autoserializeAs(Post) parent: Post = null;
    @autoserializeAs(Post) children: Post[] = [];
}