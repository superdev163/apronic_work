import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { EventsController } from './events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
