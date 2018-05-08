import {User} from './user';
import {Faculty} from './faculty';
import {Fgos} from './fgos';

export class Program{
  id: number;
  name: string;
  canEdit: boolean;
  faculty: Faculty;
  createdBy: User;
  fgos: Fgos;
}
