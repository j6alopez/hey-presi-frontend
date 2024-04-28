import { TaskStatus } from '../enums/task-status.enum';
import { TaskType } from '../enums/task-type.enum';

export interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: TaskStatus;
  type: TaskType;
}
