import {User} from './user';

export class Program{
  id: number;
  name: string;
  canEdit: boolean;
  faculty: Faculty;
  createdBy: User;
}
