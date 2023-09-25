import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}
  @Get('/')
  getAll() {
    return this.eventService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.eventService.getById(id);
  }

  @Post('/')
  create(@Body() payload: CreateEventDto) {
    return this.eventService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateEventDto) {
    return this.eventService.update(id, payload);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() data: UpdateStatusDto) {
    return this.eventService.updateStatus(id, data.status);
  }
}
