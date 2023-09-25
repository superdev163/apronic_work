import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EventStatus } from './event.type';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  start_at: Date;

  @Column()
  end_at: Date;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.Pending,
  })
  status: EventStatus;
}
