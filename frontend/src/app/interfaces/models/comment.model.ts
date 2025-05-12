import { Task } from "../tasks";
import { User } from "./user.model";

export interface Comment {
  id: string;
  task: Task;
  taskId: string;
  author: User;
  authorId: string;
  content: string;
  createdAt: string;
}