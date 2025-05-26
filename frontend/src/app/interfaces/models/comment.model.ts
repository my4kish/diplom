import { Task } from "./task.model";
import { User } from "./user.model";

export interface taskComment {
  id: string;
  task: Task;
  taskId: string;
  author: User;
  authorId: string;
  content: string;
  createdAt: string;
}