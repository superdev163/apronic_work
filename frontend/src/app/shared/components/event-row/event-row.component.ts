import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventStatus } from '../../enums/event-status';
import { EventService } from '../../services/event.service';
import { SocketService } from '../../services/socket.service';
import EventModel from '../../models/event.model';

@Component({
  selector: 'app-event-row',
  templateUrl: './event-row.component.html',
  styleUrls: ['./event-row.component.scss'],
})
export class EventRowComponent implements OnInit, OnDestroy {
  @Input() event!: EventModel;
  @Input() no: number = 0;
  @Output() updateEvent = new EventEmitter();

  progress: number = 0;

  eventStatus = EventStatus;

  intervalId: any;
  constructor(
    private router: Router,
    private eventSrv: EventService,
    protected socketSrv: SocketService
  ) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.checkStatus();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  checkStatus(): void {
    const totalDiff = moment(this.event.end_at).diff(
      moment(this.event.start_at),
      's'
    );
    const isRunning = moment().isBetween(
      moment(this.event.start_at),
      moment(this.event.end_at)
    );
    const isFinished = moment().isAfter(moment(this.event.end_at));

    if (this.event.status === EventStatus.Pending && isRunning) {
      this.updateStatus(EventStatus.Running);
    }

    if (this.event.status === EventStatus.Running) {
      const currentDiff = moment().diff(moment(this.event.start_at), 's');
      if (isFinished) {
        this.updateStatus(EventStatus.Completed);
      }
      if (isRunning) {
        this.progress = (currentDiff / totalDiff) * 100;
      }
    }
  }

  editEvent(): void {
    this.updateEvent.emit(this.event.id);
  }

  updateStatus(status: EventStatus): void {
    this.eventSrv.updateStatus(this.event.id, status).subscribe(
      res => {
        this.event = res;
        this.socketSrv.notifyToServer();
      },
      err => {
        console.log(err);
      }
    );
  }
}
