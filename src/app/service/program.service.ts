import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Course} from '../entity/course';
import {UserService} from './user.service';
import {Message} from '../entity/message';
import {Program} from '../entity/program';
import {AnalyzeResult} from '../entity/AnalyzeResult';
import {Block} from '../entity/block';

@Injectable()
export class ProgramService {
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getProgram(programId: number): Observable<Program> {
    let programAddress = this.serverAddress + 'program/' + programId;

    return this.http.get<Program>(programAddress, {headers: this.userService.getAuthHeaders()});
  }

  getAllCoursesFromProgram(programId: number): Observable<Course[]> {
    let allCoursesAddress = this.serverAddress + 'program/' + programId + '/allCourses';

    return this.http.get<Course[]>(allCoursesAddress, {headers: this.userService.getAuthHeaders()});
  }

  getAllTemplateCoursesFromProgram(programId: number): Observable<Block[]> {
    let allCoursesAddress = this.serverAddress + 'program/' + programId + '/allTemplateCourses';

    return this.http.get<Block[]>(allCoursesAddress, {headers: this.userService.getAuthHeaders()});
  }

  addProgram(): Observable<Program> {
    let programAddress = this.serverAddress + 'program/addProgram';

    return this.http.get<Program>(programAddress, {headers: this.userService.getAuthHeaders()});
  }

  saveProgram(program: Program): Observable<Program> {
    let programAddress = this.serverAddress + 'program/' + program.id;

    return this.http.post<Program>(programAddress, program, {headers: this.userService.getAuthHeaders()});
  }

  getAllPrograms(): Observable<Program[]> {
    let allCoursesAddress = this.serverAddress + 'program/allPrograms';

    return this.http.get<Program[]>(allCoursesAddress, {headers: this.userService.getAuthHeaders()});
  }

  deleteProgram(programId: number): Observable<Message> {
    let programAddress = this.serverAddress + 'program/' + programId;

    return this.http.delete<Message>(programAddress, {headers: this.userService.getAuthHeaders()});
  }

  addCourseToProgram(programId: number): Observable<Course> {
    let courseAddress = this.serverAddress + 'program/' + programId + '/addCourse';

    return this.http.get<Course>(courseAddress, {headers: this.userService.getAuthHeaders()});
  }

  addTemplateCourseToProgram(programId: number): Observable<Block> {
    let courseAddress = this.serverAddress + 'program/' + programId + '/addTemplateCourse';

    return this.http.get<Block>(courseAddress, {headers: this.userService.getAuthHeaders()});
  }

  analyze(programId: number): Observable<AnalyzeResult> {
    let analyzeAddress = this.serverAddress + 'program/' + programId + '/analyze';
    return this.http.get<AnalyzeResult>(analyzeAddress, {headers: this.userService.getAuthHeaders()});
  }

  addCourseByTemplate(templateCourseId: number): Observable<Course> {
    let analyzeAddress = this.serverAddress + 'block/' + templateCourseId + '/addCourse';
    return this.http.get<Course>(analyzeAddress, {headers: this.userService.getAuthHeaders()});
  }
}
