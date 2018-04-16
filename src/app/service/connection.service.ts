import {Injectable} from "@angular/core";

@Injectable()
export class ConnectionService {
  private SERVER_ADDRESS = 'http://localhost:8080/api/v1/';
  getServerAddress(): string{
    return this.SERVER_ADDRESS;
  }
}
