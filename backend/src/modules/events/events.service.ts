import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventStatus } from './event.type';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  public async getAll() {
    return await this.eventRepository.find();
  }

  public async getById(id: string) {
    return await this.eventRepository.findOneById(id);
  }

  public async create(payload: CreateEventDto) {
    return await this.eventRepository.save(payload);
  }

  public async update(id: string, payload: UpdateEventDto) {
    const event = await this.getById(id);

    Object.assign(event, payload);

    return await this.eventRepository.save(event);
  }

  public async updateStatus(id: string, status: EventStatus) {
    const event = await this.getById(id);

    event.status = status;

    return await this.eventRepository.save(event);
  }
}
