import type { Priority } from "./types";

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
