export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'new' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  dueDate: string; // Дата в формате ISO строки
  assignedTo: string[]; // Массив ID пользователей
  projectId: string; // ID проекта
  comments: string[]; // Массив ID комментариев
  createdAt: string; // Дата создания
  updatedAt: string; // Дата последнего обновления
}
