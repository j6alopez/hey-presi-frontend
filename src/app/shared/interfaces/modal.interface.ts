import { Observable } from "rxjs";

export interface Modal {
  title: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
}