import {Faculty} from './faculty';

export class User{
  id: number;
  firstName: string;
  secondName: string;
  login: string;

  role: Role;
  faculty: Faculty;
  department: Department;

  canEdit: boolean;
  canChangeRole: boolean;
  canChangeFacultyAndDepartment: boolean;
}
