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

// Notifies subscribers if the status of authorization has been changed
@Injectable()
export class UserService extends Subject<User> {
  private readonly STORAGE_TOKEN_KEY = 'AUTH_TOKEN';
  private serverAddress: string;

  private token: string;
  private savedUser: User;

  constructor(private connectionService: ConnectionService, private http: HttpClient) {
    super();
    this.serverAddress = connectionService.getServerAddress();
    this.restoreTokenFromCookies();
  }

  getMyUserInfo(): Observable<User> {
    let userAddress = this.serverAddress + 'user';
    return this.http.get<User>(userAddress, {headers: this.getAuthHeaders()});
  }

  getSavedUser(): User {
    return this.savedUser;
  }

  isLogged(): boolean {
    return this.token != null;
  }

  getAuthHeaders(): HttpHeaders {
    if (this.isLogged()) {
      return new HttpHeaders({'X-Auth-Token': this.token});
    }

    return new HttpHeaders();
  }

  signUp(registerData: RegisterData): Observable<User> {
    let signUpAddress = this.serverAddress + 'signUp';
    return this.http.post<User>(signUpAddress, registerData, {headers: this.getAuthHeaders()});
  }

  signIn(authData: AuthData): Observable<Token> {
    let signInAddress = this.serverAddress + 'signIn';

    return new Observable<Token>(observer => {
      this.http.post<Token>(signInAddress, authData, {headers: this.getAuthHeaders()}).subscribe(token => {
        this.token = token.data;
        Cookie.set(this.STORAGE_TOKEN_KEY, token.data);
        observer.next(token);
        this.onUserStateChanged();
      });
    });
  }

  signOut(): Observable<Message> {
    let signOutAddress = this.serverAddress + 'signOut';

    return new Observable<Message>(observer => {
      this.http.get<Message>(signOutAddress, {headers: this.getAuthHeaders()}).subscribe(message => {
        Cookie.delete(this.STORAGE_TOKEN_KEY);

        this.token = null;
        this.savedUser = null;

        observer.next(message);
        this.onUserStateChanged();
      });
    });
  }

  private restoreTokenFromCookies() {
    let savedToken = Cookie.get(this.STORAGE_TOKEN_KEY);

    if (savedToken != null) {
      this.token = savedToken;
      console.log('Restored token: ' + savedToken);

      // Check if token still actual and belong to any user
      this.getMyUserInfo().subscribe(user => {
        this.savedUser = user;
        this.onUserStateChanged();
      }, err => {
        this.token = null;
        this.savedUser = null;
        Cookie.delete(this.STORAGE_TOKEN_KEY);
        this.onUserStateChanged();
      });
    }
  }

  onUserStateChanged() {
    this.next(this.savedUser);
  }

  getAllUsers() : Observable<User[]> {
    let allUsersAddress = this.serverAddress + 'allUsers';
    return this.http.get<User[]>(allUsersAddress, {headers: this.getAuthHeaders()});
  }

  deleteUser(id: number) {
    let userAddress = this.serverAddress + 'user/' + id;
    return this.http.delete<User>(userAddress, {headers: this.getAuthHeaders()});
  }
}
