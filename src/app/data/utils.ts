import type { Priority, TaskStatus } from "./types";

export const getPriorityLabel = (priority: Priority): string => {
  const labels: Record<Priority, string> = {
    high: "高优先级",
    medium: "中优先级",
    low: "低优先级",
  };
  return labels[priority];
};

export const getPriorityColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    high: "rdb:bg-red-100 rdb:text-red-700",
    medium: "rdb:bg-yellow-100 rdb:text-yellow-700",
    low: "rdb:bg-green-100 rdb:text-green-700",
  };
  return colors[priority];
};

export const getStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    todo: "#3b82f6",
    "in-progress": "#f59e0b",
    done: "#10b981",
  };
  return colors[status];
};

export const getStatusLabel = (status: TaskStatus): string => {
  const labels: Record<TaskStatus, string> = {
    todo: "待办事项",
    "in-progress": "进行中",
    done: "已完成",
  };
  return labels[status];
};
