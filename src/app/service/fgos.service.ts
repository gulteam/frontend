import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {Message} from '../entity/message';
import {Fgos} from '../entity/fgos';

@Injectable()
export class FgosService {
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getAllFgoses(): Observable<Fgos[]> {
    let fgosAddress = this.serverAddress + 'fgos/all';

    return this.http.get<Fgos[]>(fgosAddress, {headers: this.userService.getAuthHeaders()});
  }

  getFgos(fgosId: number): Observable<Fgos> {
    let fgosAddress = this.serverAddress + 'fgos/' + fgosId;

    return this.http.get<Fgos>(fgosAddress, {headers: this.userService.getAuthHeaders()});
  }

  saveFgos(fgos: Fgos): Observable<Fgos> {
    let fgosAddress = this.serverAddress + 'fgos/' + fgos.id;

    return this.http.post<Fgos>(fgosAddress, fgos, {headers: this.userService.getAuthHeaders()});
  }

  deleteFgos(fgosId: number): Observable<Message> {
    let fgosAddress = this.serverAddress + 'fgos/' + fgosId;

    return this.http.delete<Message>(fgosAddress, {headers: this.userService.getAuthHeaders()});
  }

  addCompetence(fgosId: number) {
    let fgosAddress = this.serverAddress + 'fgos/' + fgosId + '/addCompetence';

    return this.http.get<Fgos>(fgosAddress, {headers: this.userService.getAuthHeaders()});
  }

  addReuiredCourse(fgosId: number) {
    let fgosAddress = this.serverAddress + 'fgos/' + fgosId + '/addReuiredCourse';

    return this.http.get<Fgos>(fgosAddress, {headers: this.userService.getAuthHeaders()});
  }

  create(): Observable<Fgos>  {
    let fgosAddress = this.serverAddress + 'fgos/create';

    return this.http.get<Fgos>(fgosAddress, {headers: this.userService.getAuthHeaders()});
  }
}
