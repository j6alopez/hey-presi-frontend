import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
}
