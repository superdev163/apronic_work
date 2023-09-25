import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { EventStatus } from '../event.type';

export class UpdateEventDto {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  start_at: Date;

  @IsString()
  @IsNotEmpty()
  end_at: Date;

  @IsEnum(EventStatus)
  @IsNotEmpty()
  status: EventStatus;
}
