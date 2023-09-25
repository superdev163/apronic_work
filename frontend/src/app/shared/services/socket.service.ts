import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  public getSocket() {
    return this.socket;
  }

  notifyToServer() {
    this.socket.emit('updated');
  }
}
