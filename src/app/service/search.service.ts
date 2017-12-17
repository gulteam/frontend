import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {CourseService} from './course.service';
import {ProgramService} from './program.service';
import {Variant} from '../entity/variant';
import {Trajectory} from '../entity/Trajectory';
import {Program} from '../entity/program';
import {SearchRequest} from '../entity/search-request';
import {Course} from '../entity/course';
import {ProfessionalStandardService} from './professional-standard.service';
import {ProfessionalStandard} from '../entity/professional-standard';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchService extends Subject<Trajectory[]> {
  private serverAddress: string;
  private trajectories: Trajectory[] = [];

  private allVariants: Variant[];
  private possibleVariants: Variant[];

  private positiveVariants: Variant[] = [];
  private negativeVariants: Variant[] = [];

  private programId: number;
  private program: Program;
  private request: string;

  private allCourses: Course[];
  private allStandards: ProfessionalStandard[];

  constructor(private connectionService: ConnectionService,
              private http: HttpClient,
              private userService: UserService,
              private courseService: CourseService,
              private programService: ProgramService,
              private professionalStandardService: ProfessionalStandardService) {
    super();
    this.serverAddress = connectionService.getServerAddress();
  }

  startSearchOnProgram(programId: number) {
    this.allVariants = [];
    this.positiveVariants = [];
    this.positiveVariants = [];
    this.negativeVariants = [];
    this.programId = programId;
    this.programService.getAllCoursesFromProgram(this.programId).subscribe(courses => {
      this.allCourses = courses;
      for (let course of courses) {
        this.allVariants.push(new Variant("Дисциплина: " + course.name, course));
      }
      this.recountPossibleValues();
    });

    this.professionalStandardService.getAll().subscribe(standards => {
      for (let standard of standards) {
        this.allVariants.push(new Variant("Проф. стандарт: " + standard.name, standard));
      }
      this.recountPossibleValues();
      this.allStandards = standards;
    });

    this.programService.getProgram(this.programId).subscribe(program=>{
      this.program = program;
    });

    this.reloadTrajectories();
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

        return lowerVariant.includes(lowerRequest) && !this.positiveVariants.includes(variant) && !this.negativeVariants.includes(variant);
      });
    }
    else{
      this.possibleVariants = [];
    }
  }

  getTrajectories(): Trajectory[] {
    return this.trajectories;
  }

  private reloadTrajectories(){
    let searchTrajectories = this.serverAddress + 'search';

    let includeCourses = [];
    let excludeCourses = [];
    let includeStandards = [];
    let excludeStandards = [];

    for(let positiveVariant of this.positiveVariants){
      if(this.allCourses.includes(positiveVariant.value)){
        includeCourses.push(<Course>positiveVariant.value);
      }
      else if(this.allStandards.includes(positiveVariant.value)){
        includeStandards.push(<ProfessionalStandard>positiveVariant.value);
      }
    }

    for(let negativeVariant of this.negativeVariants){
      if(this.allCourses.includes(negativeVariant.value)){
        excludeCourses.push(<Course>negativeVariant.value);
      }
      else if(this.allStandards.includes(negativeVariant.value)){
        excludeStandards.push(<ProfessionalStandard>negativeVariant.value);
      }
    }

    let searchRequest = new SearchRequest(this.program,
      includeCourses,
      excludeCourses,
      includeStandards,
      excludeStandards);

    this.http.post<Trajectory[]>(searchTrajectories, searchRequest,{headers: this.userService.getAuthHeaders()}).subscribe(trajectories=>{
      this.trajectories = trajectories;
      this.next(this.trajectories);
    });
  }

  removePositive(variant: Variant) {
    this.positiveVariants = this.positiveVariants.filter(v => v != variant);
    this.recountPossibleValues();
    this.reloadTrajectories();
  }

  removeNegative(variant: Variant) {
    this.negativeVariants = this.negativeVariants.filter(v => v != variant);
    this.recountPossibleValues();
    this.reloadTrajectories();
  }

  addPositive(variant: Variant) {
    this.positiveVariants.push(variant);
    this.recountPossibleValues();
    this.reloadTrajectories();
  }

  addNegative(variant: Variant) {
    this.negativeVariants.push(variant);
    this.recountPossibleValues();
    this.reloadTrajectories();
  }

  getNegativeVariants(): Variant[] {
    return this.negativeVariants;
  }

  getPositiveVariants(): Variant[] {
    return this.positiveVariants;
  }
}
