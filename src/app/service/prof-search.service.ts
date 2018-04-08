import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {CourseService} from './course.service';
import {ProgramService} from './program.service';
import {Variant} from '../entity/variant';
import {ProfessionalStandardService} from './professional-standard.service';
import {ProfessionalStandard} from '../entity/professional-standard';
import {Subject} from 'rxjs/Subject';
import {SkillsService} from "./skills.service";
import {KnowledgeService} from "./knowledge.service";
import {ProfSearchRequest} from "../entity/prof-search-request";

@Injectable()
export class ProfSearchService extends Subject<ProfessionalStandard[]> {
  private serverAddress: string;
  private professionalStandards: ProfessionalStandard[] = [];

  private allVariants: Variant[];
  private possibleVariants: Variant[];

  private positiveVariants: Variant[] = [];

  private request: string;

  private allSkills: Skills[];
  private allKnowledges: Knowledge[];

  constructor(private connectionService: ConnectionService,
              private http: HttpClient,
              private userService: UserService,
              private courseService: CourseService,
              private programService: ProgramService,
              private professionalStandardService: ProfessionalStandardService,
              private skillsService: SkillsService,
              private knowledgeService: KnowledgeService) {
    super();
    this.serverAddress = connectionService.getServerAddress();
  }

  startSearch() {
    this.allVariants = [];
    this.possibleVariants = [];
    this.positiveVariants = [];
    this.skillsService.getAllSkills().subscribe(skills => {
      this.allSkills = skills;
      for (let skill of skills) {
        this.allVariants.push(new Variant("Умение: " + skill.description, skill));
      }
      this.recountPossibleValues();
    });

    this.knowledgeService.getAllKnowledge().subscribe(knowledges => {
      this.allKnowledges = knowledges;
      for (let knowledge of knowledges) {
        this.allVariants.push(new Variant("Знания: " + knowledge.description, knowledge));
      }
      this.recountPossibleValues();
    });

    this.reloadProfStandarts();
  }

  getPossibleVariants(): Variant[] {
    return this.possibleVariants;
  }

  requestLineChanged(request: string) {
    this.request = request;
    this.recountPossibleValues();
  }

  private recountPossibleValues() {
    if (this.request) {
      this.possibleVariants = this.allVariants.filter(variant => {
        let lowerVariant = variant.text.toLowerCase();
        let lowerRequest = this.request.toLowerCase();

        return lowerVariant.includes(lowerRequest) && !this.positiveVariants.includes(variant);
      });
    }
    else{
      this.possibleVariants = [];
    }
  }

  getProfessionalStandards(): ProfessionalStandard[] {
    return this.professionalStandards;
  }

  private reloadProfStandarts(){
    let searchProfStandarts = this.serverAddress + 'profSearch';

    let includeKnowledges = [];
    let includeSkills = [];

    for(let positiveVariant of this.positiveVariants){
      if(this.allSkills.includes(positiveVariant.value)){
        includeSkills.push(<Skills>positiveVariant.value);
      }
      else if(this.allKnowledges.includes(positiveVariant.value)){
        includeKnowledges.push(<Knowledge>positiveVariant.value);
      }
    }

    let searchRequest = new ProfSearchRequest(
      includeSkills,
      includeKnowledges);

    this.http.post<ProfessionalStandard[]>(searchProfStandarts, searchRequest,{headers: this.userService.getAuthHeaders()}).subscribe(professionalStandards=>{
      this.professionalStandards = professionalStandards;
    });
  }

  removePositive(variant: Variant) {
    this.positiveVariants = this.positiveVariants.filter(v => v != variant);
    this.recountPossibleValues();
    this.reloadProfStandarts();
  }


  addPositive(variant: Variant) {
    this.positiveVariants.push(variant);
    this.recountPossibleValues();
    this.reloadProfStandarts();
  }

  getPositiveVariants(): Variant[] {
    return this.positiveVariants;
  }
}
