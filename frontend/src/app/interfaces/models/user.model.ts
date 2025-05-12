import { Task } from "../tasks";
import { Project } from "./project.model";

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: RoleType;
  position?: string;
  avatarUrl?: string;
  projects: Project[];        // проекты, где пользователь — участник
  tasks: Task[];              // задачи, где пользователь — исполнитель
  notifications: Notification[];
  comments: Comment[];        // комментарии пользователя
  createdAt: string;          // ISO-строка даты
  updatedAt: string;
  Project: Project[];         // (если у вас есть в схеме такое поле)
}

export enum RoleType {
  SuperAdmin   = 'superadmin',
  OrgAdmin     = 'orgadmin',
  ProjectAdmin = 'projectadmin',
  PowerUser    = 'poweruser',
  User         = 'user',
}