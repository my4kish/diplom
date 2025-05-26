import { taskComment } from "./comment.model";
import { Project } from "./project.model";
import { User } from "./user.model";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority: Priority;
  dueDate?: Date;
  imgUrls: string[];
  assignedTo: User;
  assignedToId: string;
  project: Project;
  projectId: string;
  comments: taskComment[];
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  New        = 'new',
  InProgress = 'in_progress',
  Completed  = 'completed',
  Overdue    = 'overdue',
}

export enum Priority {
  Low    = 'low',
  Medium = 'medium',
  High   = 'high',
}