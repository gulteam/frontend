import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Course} from '../entity/course';
import {UserService} from './user.service';
import {Message} from '../entity/message';
import {Competence} from '../entity/competence';

@Injectable()
export class CompetenceService{
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getCompetence(competenceId: number): Observable<Competence>{
    let competenceAddress = this.serverAddress + 'competence/' + competenceId;

    return this.http.get<Competence>(competenceAddress, {headers: this.userService.getAuthHeaders()});
  }

  saveCompetence(competence: Competence): Observable<Competence>{
    let competenceAddress = this.serverAddress + 'competence/' + competence.id;

    return this.http.post<Competence>(competenceAddress, competence,{headers: this.userService.getAuthHeaders()});
  }

  deleteCompetence(competenceId: number): Observable<Message>{
    let competenceAddress = this.serverAddress + 'competence/' + competenceId;

    return this.http.delete<Message>(competenceAddress, {headers: this.userService.getAuthHeaders()});
  }
}
