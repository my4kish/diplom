import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNotificationDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsBoolean()
  isRead?: boolean;
}