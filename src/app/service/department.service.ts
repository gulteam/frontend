import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {Message} from '../entity/message';

@Injectable()
export class DepartmentService{
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getDepartment(departmentId: number): Observable<Department>{
    let departmentAddress = this.serverAddress + 'department/' + departmentId;

    return this.http.get<Department>(departmentAddress, {headers: this.userService.getAuthHeaders()});
  }

  saveDepartment(department: Department): Observable<Department>{
    let departmentAddress = this.serverAddress + 'department/' + department.id;

    return this.http.post<Department>(departmentAddress, department,{headers: this.userService.getAuthHeaders()});
  }

  deleteDepartment(departmentId: number): Observable<Message>{
    let departmentAddress = this.serverAddress + 'department/' + departmentId;

    return this.http.delete<Message>(departmentAddress, {headers: this.userService.getAuthHeaders()});
  }
}
