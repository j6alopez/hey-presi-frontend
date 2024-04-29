import { Task } from "./task.interface";

export interface TasksResponseDto {
  totalResults: number;
  nextOffset:   number;
  data:         Data;
}

export interface Data {
  tasks: Task[];
}
