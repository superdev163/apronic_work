import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { SocketService } from '../../services/socket.service';
import { EventStatus } from '../../enums/event-status';
import * as moment from 'moment';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit, OnChanges {
  @Input() id: string | null = null;
  eventForm: FormGroup;

  constructor(
    protected eventService: EventService,
    protected socketSrv: SocketService
  ) {
    this.eventForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      start_at: new FormControl('', [Validators.required]),
      end_at: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'].currentValue) {
      this.eventService.getOneById(changes['id'].currentValue).subscribe(
        event => {
          this.eventForm.setValue({
            name: event.name,
            start_at: moment(event.start_at).format('YYYY-MM-DDTHH:mm'),
            end_at: moment(event.end_at).format('YYYY-MM-DDTHH:mm'),
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  private validateDate(): boolean {
    if (
      this.eventForm.get('start_at')?.value &&
      this.eventForm.get('end_at')?.value
    ) {
      if (
        !moment(this.eventForm.get('start_at')?.value).isBefore(
          moment(this.eventForm.get('end_at')?.value)
        )
      ) {
        this.eventForm.controls?.['end_at']?.setErrors({ incorrect: true });
        return false;
      }

      return true;
    }
    return false;
  }

  onSubmit(): void {
    if (this.validateDate()) {
      if (this.id) {
        this.eventService
          .update({
            id: this.id,
            ...this.eventForm.value,
          })
          .subscribe(
            res => {
              this.socketSrv.notifyToServer();
            },
            error => {
              console.log(error);
            }
          );
      } else {
        this.eventService
          .create({
            ...this.eventForm.value,
            status: EventStatus.Pending,
          })
          .subscribe(
            res => {
              this.socketSrv.notifyToServer();
            },
            error => {
              console.log(error);
            }
          );
      }

      this.eventForm.reset();
    }
  }
}
