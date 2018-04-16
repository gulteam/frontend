import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {ConnectionService} from './connection.service';
import {Observable} from 'rxjs/Observable';
import {Message} from '../entity/Message';
import {Course} from '../entity/course';
import {Program} from '../entity/program';

@Injectable()
export class FacultyService {
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getAllFaculties(): Observable<Faculty[]> {
    let allFacultiesAddress = this.serverAddress + 'faculty/all';

    return this.http.get<Faculty[]>(allFacultiesAddress, {headers: this.userService.getAuthHeaders()});
  }

  getAllDepartments(facultyId: number): Observable<Department[]> {
    let allDepartmentsAddress = this.serverAddress + 'faculty/' + facultyId + '/allDepartments';

    return this.http.get<Department[]>(allDepartmentsAddress, {headers: this.userService.getAuthHeaders()});
  }

  deleteFaculty(facultyId: number): Observable<Message> {
    let facultyAdress = this.serverAddress + 'faculty/' + facultyId;

    return this.http.delete<Message>(facultyAdress, {headers: this.userService.getAuthHeaders()});
  }

  addDepartmentToFaculty(facultyId: number): Observable<Department> {
    let facultyAdress = this.serverAddress + 'faculty/' + facultyId + '/addDepartment';

    return this.http.get<Department>(facultyAdress, {headers: this.userService.getAuthHeaders()});
  }

  addFaculty(): Observable<Faculty> {
    let facultyAddress = this.serverAddress + 'faculty/addFaculty';

    return this.http.get<Faculty>(facultyAddress, {headers: this.userService.getAuthHeaders()});
  }
}
