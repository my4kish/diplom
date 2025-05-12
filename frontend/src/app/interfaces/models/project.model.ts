import { Task } from "../tasks";
import { User } from "./user.model";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  tasks: Task[];
  members: User[];            // участники проекта
  createdBy: User;            // автор создания проекта
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export enum ProjectStatus {
  Active    = 'active',
  Completed = 'completed',
  Archived  = 'archived',
}