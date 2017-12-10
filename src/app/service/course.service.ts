import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Course} from '../entity/course';
import {UserService} from './user.service';
import {Message} from '../entity/message';

@Injectable()
export class CourseService{
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getCourse(courseId: number): Observable<Course>{
    let courseAddress = this.serverAddress + 'course/' + courseId;

    return this.http.get<Course>(courseAddress, {headers: this.userService.getAuthHeaders()});
  }

  getAllCoursesFromProgram(programId: number): Observable<Course[]>{
    let allCoursesAddress = this.serverAddress + 'program/' + programId + "/allCourses";

    return this.http.get<Course[]>(allCoursesAddress, {headers: this.userService.getAuthHeaders()});
  }

  saveCourse(course: Course): Observable<Course>{
    let courseAddress = this.serverAddress + 'course/' + course.id;

    return this.http.post<Course>(courseAddress, course,{headers: this.userService.getAuthHeaders()});
  }

  addCourse(programId: number): Observable<Course>{
    let courseAddress = this.serverAddress + 'program/' + programId + "/addCourse";

    return this.http.get<Course>(courseAddress, {headers: this.userService.getAuthHeaders()})
  }

  deleteCourse(courseId: number): Observable<Message>{
    let courseAddress = this.serverAddress + 'course/' + courseId;

    return this.http.delete<Message>(courseAddress, {headers: this.userService.getAuthHeaders()});
  }
}
