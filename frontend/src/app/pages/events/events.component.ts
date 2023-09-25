import { Component, OnInit } from '@angular/core';
import EventModel from '../../shared/models/event.model';
import { EventService } from '../../shared/services/event.service';
import { SocketService } from '../../shared/services/socket.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: EventModel[] = [];
  editableId: string | null = null;

  constructor(
    protected eventSrv: EventService,
    protected socketSrv: SocketService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();

    this.socketSrv.getSocket().on('updated', () => {
      this.editableId = null;
      this.fetchEvents();
    });
  }

  fetchEvents() {
    this.eventSrv.getAll({}).subscribe(
      events => {
        this.events = events;
      },
      err => {
        console.log(err);
      }
    );
  }

  updateEvent(id: string) {
    this.editableId = id;
  }
}
