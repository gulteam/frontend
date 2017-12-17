import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {ConnectionService} from './connection.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RolesService {
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getAllRoles(): Observable<Role[]> {
    let allRolesAddress = this.serverAddress + 'allRoles';

    return this.http.get<Role[]>(allRolesAddress, {headers: this.userService.getAuthHeaders()});
  }
}
