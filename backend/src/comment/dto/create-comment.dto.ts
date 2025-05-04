import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  taskId: string;

  @IsString()
  content: string;
}
