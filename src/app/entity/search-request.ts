import {Program} from './program';
import {Course} from './course';
import {ProfessionalStandard} from './professional-standard';

export class SearchRequest{
  basicEducationProgram: Program;
  includeCourses: Course[];
  excludeCourses: Course[];
  includeStandards: ProfessionalStandard[];
  excludeStandards: ProfessionalStandard[];


  constructor(basicEducationProgram: Program, includeCourses: Course[], excludeCourses: Course[], includeStandards: ProfessionalStandard[], excludeStandards: ProfessionalStandard[]) {
    this.basicEducationProgram = basicEducationProgram;
    this.includeCourses = includeCourses;
    this.excludeCourses = excludeCourses;
    this.includeStandards = includeStandards;
    this.excludeStandards = excludeStandards;
  }
}
