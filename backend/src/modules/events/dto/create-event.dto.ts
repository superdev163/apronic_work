import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  start_at: string;

  @IsString()
  @IsNotEmpty()
  end_at: string;
}
