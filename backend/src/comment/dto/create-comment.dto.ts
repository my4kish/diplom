import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsNotEmpty()
  taskId: Types.ObjectId;

  @IsNotEmpty()
  authorId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  content: string;
}
