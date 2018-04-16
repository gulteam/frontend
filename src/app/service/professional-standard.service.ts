import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from "../entity/user";
import {Token} from "../entity/token";
import {AuthData} from "../entity/authdata";
import {ConnectionService} from "./connection.service";
import {RegisterData} from "../entity/register-data";
import {Message} from "../entity/message";
import {ProfessionalStandard} from '../entity/professional-standard';
import {UserService} from './user.service';

// Notifies subscribers if the status of authorization has been changed
@Injectable()
export class ProfessionalStandardService extends Subject<User> {
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    super();
    this.serverAddress = connectionService.getServerAddress();
  }

  getAll(): Observable<ProfessionalStandard[]> {
    const allProfessionalStandardsAddress = this.serverAddress + 'professionalStandard/allStandards';
    return this.http.get<ProfessionalStandard[]>(allProfessionalStandardsAddress, {headers: this.userService.getAuthHeaders()});
  }

  getProfessionalStandard(professionalStandardId: number): Observable<ProfessionalStandard> {
    const allProfessionalStandardsAddress = this.serverAddress + 'professionalStandard/' + professionalStandardId;
    return this.http.get<ProfessionalStandard>(allProfessionalStandardsAddress, {headers: this.userService.getAuthHeaders()});
  }

  getSkillsByProfessionalStandardId(professionalStandardId: number): Observable<Skills[]> {
    const allSkillsAddress = this.serverAddress + 'professionalStandard/' + professionalStandardId + '/allSkills';

    return this.http.get<Skills[]>(allSkillsAddress, {headers: this.userService.getAuthHeaders()});
  }

  getKnowledgesByProfessionalStandardId(professionalStandardId: number): Observable<Knowledge[]> {
    const allSkillsAddress = this.serverAddress + 'professionalStandard/' + professionalStandardId + '/allKnowledges';

    return this.http.get<Knowledge[]>(allSkillsAddress, {headers: this.userService.getAuthHeaders()});
  }
}
