export type Priority = "high" | "medium" | "low";

export interface Task {
  content: string;
  priority: Priority;
}

export interface TodoItem {
  text: string;
  completed: boolean;
}
