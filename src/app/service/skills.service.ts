import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {ConnectionService} from './connection.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SkillsService {
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getAllSkills(): Observable<Skills[]> {
    let allSkillsAddress = this.serverAddress + 'allSkills';

    return this.http.get<Skills[]>(allSkillsAddress, {headers: this.userService.getAuthHeaders()});
  }
}
