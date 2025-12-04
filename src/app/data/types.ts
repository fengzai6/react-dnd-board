export type Priority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  content: string;
  priority: Priority;
}

export interface TodoItem {
  text: string;
  completed: boolean;
  tags?: string[];
}

export interface FileItem {
  name: string;
  type: "file" | "folder";
  size?: string;
}

export interface ShoppingItem {
  name: string;
  quantity: number;
  category: string;
  purchased: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}
