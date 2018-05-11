import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Course} from '../entity/course';
import {UserService} from './user.service';
import {Message} from '../entity/message';
import {Block} from '../entity/block';

@Injectable()
export class BlockService{
  private serverAddress: string;

  constructor(private connectionService: ConnectionService, private http: HttpClient, private userService: UserService) {
    this.serverAddress = connectionService.getServerAddress();
  }

  getBlock(blockId: number): Observable<Block>{
    let blockAddress = this.serverAddress + 'block/' + blockId;

    return this.http.get<Block>(blockAddress, {headers: this.userService.getAuthHeaders()});
  }

  saveBlock(block: Block): Observable<Block>{
    let blockAddress = this.serverAddress + 'block/' + block.id;

    return this.http.post<Block>(blockAddress, block,{headers: this.userService.getAuthHeaders()});
  }

  deleteBlock(blockId: number): Observable<Message>{
    let blockAddress = this.serverAddress + 'block/' + blockId;

    return this.http.delete<Message>(blockAddress, {headers: this.userService.getAuthHeaders()});
  }
}
