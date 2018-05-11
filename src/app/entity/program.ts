import {User} from './user';
import {Faculty} from './faculty';
import {Fgos} from './fgos';

export class Program{
  id: number;
  name: string;
  faculty: Faculty;
  createdBy: User;
  fgos: Fgos;

  canUpdate: boolean;
  canDelete: boolean;
  canAddVariableCourse: boolean;
}
