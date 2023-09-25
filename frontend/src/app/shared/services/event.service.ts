import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import EventModel from '../models/event.model';
import { environment } from '../../../environments/environment.dev';
import { EventStatus } from '../enums/event-status';

@Injectable()
export class EventService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  create(event: EventModel, hasSpinner = true): Observable<any> {
    return new Observable(observer => {
      this.post(`${environment.APIServer}/events`, event, hasSpinner).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  getAll(query: any, hasSpinner = true): Observable<any> {
    return new Observable(observer => {
      this.get(`${environment.APIServer}/events`, query, hasSpinner).subscribe(
        response => {
          observer.next(response.map((item: any) => new EventModel(item)));
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  getOneById(id: number): Observable<any> {
    return new Observable(observer => {
      this.get(`${environment.APIServer}/events/${id}`).subscribe(
        event => {
          observer.next(new EventModel(event));
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  update(event: EventModel, hasSpinner = true): Observable<any> {
    return new Observable(observer => {
      const { id, ...rest } = event;

      this.put(
        `${environment.APIServer}/events/${event.id}`,
        rest,
        hasSpinner
      ).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  updateStatus(id: number, status: EventStatus): Observable<any> {
    return new Observable(observer => {
      this.put(`${environment.APIServer}/events/${id}/status`, {
        status,
      }).subscribe(
        response => {
          observer.next(new EventModel(response));
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }
}
