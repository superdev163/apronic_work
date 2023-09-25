import { EventStatus } from '../enums/event-status';

export default class EventModel {
  id: number;
  name: string;
  start_at: Date;
  end_at: Date;
  status: EventStatus;

  constructor(data: {
    id: number;
    name: string;
    start_at: Date;
    end_at: Date;
    status: EventStatus;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.start_at = data.start_at;
    this.end_at = data.end_at;
    this.status = data.status;
  }
}
