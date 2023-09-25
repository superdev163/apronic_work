import { IsNotEmpty, IsEnum } from 'class-validator';
import { EventStatus } from '../event.type';

export class UpdateStatusDto {
  @IsEnum(EventStatus)
  @IsNotEmpty()
  status: EventStatus;
}
