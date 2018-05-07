import {CourseRequirement} from './course-requirement';
import {Competence} from './competence';

export class Fgos {
  id: number;
  code: string;
  name: string;
  requireCompetence: Competence[];
  disciplineVolumeFrom: number;
  practiceVolumeFrom: number;
  attestationVolumeFrom: number;
  summaryVolume: number;
  requireCourses: CourseRequirement[];
}
