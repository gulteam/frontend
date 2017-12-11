export class Course{
  id: number;
  amount: number;
  semester: number;
  attestationForm: string;
  name: string;

  previousCourses: number[];
  nextCourses: number[];

  // If course based on some template field "isImplements" will contain "true" and filed "templateCourse" contains id of template.
  isImplements: boolean;
  templateCourse: number;

  developCompetence: number[];
  developSkills: number[];
  developKnowledge: number[];
}
