import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Course} from '../entity/course';
import {UserService} from './user.service';
import {Message} from '../entity/message';
import {Competence} from '../entity/competence';
import {CourseRequirement} from '../entity/course-requirement';

@Injectable()
export class CourseRequirementService{
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getCourseRequirement(courseRequirementId: number): Observable<CourseRequirement>{
    let courseRequirementAddress = this.serverAddress + 'courseRequirement/' + courseRequirementId;

    return this.http.get<CourseRequirement>(courseRequirementAddress, {headers: this.userService.getAuthHeaders()});
  }

  saveCourseRequirement(courseRequirement: CourseRequirement): Observable<CourseRequirement>{
    let courseRequirementAddress = this.serverAddress + 'courseRequirement/' + courseRequirement.id;

    return this.http.post<CourseRequirement>(courseRequirementAddress, courseRequirement,{headers: this.userService.getAuthHeaders()});
  }

  deleteCourseRequirement(courseRequirementId: number): Observable<Message>{
    let courseRequirementAddress = this.serverAddress + 'courseRequirement/' + courseRequirementId;

    return this.http.delete<Message>(courseRequirementAddress, {headers: this.userService.getAuthHeaders()});
  }
}
