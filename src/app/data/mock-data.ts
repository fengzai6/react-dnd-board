import type { BaseDndData, BoardList } from "@/lib/types";
import type { Priority } from "./types";

// 列表数据类型
interface ListData extends BaseDndData {
  title: string;
  color: string;
}

// 任务数据类型
interface TaskData extends BaseDndData {
  content: string;
  priority: Priority;
}

// 待办列表数据类型
interface TodoListData extends BaseDndData {
  name: string;
  description: string;
}

// 待办项数据类型
interface TodoItemData extends BaseDndData {
  text: string;
  completed: boolean;
}

// 看板数据
export const basicBoardData: BoardList<ListData, TaskData>[] = [
  {
    id: "todo",
    label: "待办事项",
    title: "待办事项",
    color: "#3b82f6",
    items: [
      {
        id: "task-1",
        label: "设计用户界面原型",
        content: "设计用户界面原型",
        priority: "high",
      },
      {
        id: "task-2",
        label: "编写 API 文档",
        content: "编写 API 文档",
        priority: "medium",
      },
      {
        id: "task-3",
        label: "准备项目演示材料",
        content: "准备项目演示材料",
        priority: "low",
      },
    ],
  },
  {
    id: "in-progress",
    label: "进行中",
    title: "进行中",
    color: "#f59e0b",
    items: [
      {
        id: "task-4",
        label: "实现拖拽功能",
        content: "实现拖拽功能",
        priority: "high",
      },
      {
        id: "task-5",
        label: "编写单元测试",
        content: "编写单元测试",
        priority: "high",
      },
    ],
  },
  {
    id: "done",
    label: "已完成",
    title: "已完成",
    color: "#10b981",
    items: [
      {
        id: "task-6",
        label: "项目初始化",
        content: "项目初始化",
        priority: "high",
      },
      {
        id: "task-7",
        label: "配置开发环境",
        content: "配置开发环境",
        priority: "medium",
      },
    ],
  },
];

// 列表数据
export const basicListData: TodoListData & { items: TodoItemData[] } = {
  id: "my-todos",
  label: "我的待办清单",
  name: "我的待办清单",
  description: "个人任务管理",
  items: [
    {
      id: "todo-1",
      label: "完成项目文档",
      text: "完成项目文档",
      completed: false,
    },
    { id: "todo-2", label: "健身房锻炼", text: "健身房锻炼", completed: true },
    {
      id: "todo-3",
      label: "学习 TypeScript",
      text: "学习 TypeScript",
      completed: false,
    },
    {
      id: "todo-4",
      label: "准备周会分享",
      text: "准备周会分享",
      completed: false,
    },
  ],
};
