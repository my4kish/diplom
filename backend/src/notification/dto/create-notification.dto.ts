import { IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  userId: string;

  @IsString()
  contentType: string;

  @IsString()
  message: string;
}
