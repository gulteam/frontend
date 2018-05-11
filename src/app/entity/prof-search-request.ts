import {Program} from './program';
import {Course} from './course';
import {ProfessionalStandard} from './professional-standard';

export class ProfSearchRequest{
  includeSkills: Skills[];
  includeKnowledges: Knowledge[];


  constructor(includeSkills: Skills[],includeKnowledges: Knowledge[]) {
    this.includeSkills = includeSkills;
    this.includeKnowledges = includeKnowledges;
  }
}
