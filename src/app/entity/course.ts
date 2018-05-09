import {User} from './user';
import {Faculty} from './faculty';

export class Course{
  id: number;
  amount: number;
  semester: number;
  attestationForm: string;
  name: string;

  previousCourses: number[];
  nextCourses: number[];

  // If course based on some template field "implementsTemplate" will contain "true" and filed "templateCourse" contains id of template.
  implementsTemplate: boolean;
  templateCourse: number;

  developCompetence: number[];
  developSkills: number[];
  developKnowledge: number[];

  programId: number;

  canUpdate: boolean;
  canDelete: boolean;
  canUpdateDevelopersList: boolean;
  createdBy: User;

  department: Department;
  faculty: Faculty;
  developedBy: number[];
}
