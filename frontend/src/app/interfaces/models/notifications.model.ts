import { User } from "./user.model";

export interface Notification {
  id: string;
  user: User;
  userId: string;
  contentType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}