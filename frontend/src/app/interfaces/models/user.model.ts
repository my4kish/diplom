import { Task } from "./task.model";
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
  gender: string;
  phone: string;
  aboutMe: string;
  city: string;
  projects: Project[];        // проекты, где пользователь — участник
  tasks: Task[];              // задачи, где пользователь — исполнитель
  notifications: Notification[];
  comments: Comment[];        // комментарии пользователя
  createdAt: string;          // ISO-строка даты
  updatedAt: string;
  Project: Project[];         // (если у вас есть в схеме такое поле)
}

export enum RoleType {
  superadmin   = 'superadmin',
  orgadmin     = 'orgadmin',
  projectadmin = 'projectadmin',
  poweruser    = 'poweruser',
  user         = 'user',
}