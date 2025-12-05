import type { ListItem, ListItems } from "@/lib/types";
import type { Priority, Task } from "./types";

// 基础看板数据
export const basicBoardData: ListItems<{ title: string; color: string }, Task> =
  [
    {
      id: "todo",
      title: "待办事项",
      color: "#3b82f6",
      items: [
        { id: "task-1", content: "设计用户界面原型", priority: "high" },
        { id: "task-2", content: "编写 API 文档", priority: "medium" },
        { id: "task-3", content: "准备项目演示材料", priority: "low" },
      ],
    },
    {
      id: "in-progress",
      title: "进行中",
      color: "#f59e0b",
      items: [
        { id: "task-4", content: "实现拖拽功能", priority: "high" },
        { id: "task-5", content: "编写单元测试", priority: "high" },
      ],
    },
    {
      id: "done",
      title: "已完成",
      color: "#10b981",
      items: [
        { id: "task-6", content: "项目初始化", priority: "high" },
        { id: "task-7", content: "配置开发环境", priority: "medium" },
      ],
    },
  ];

// 基础列表数据
export const basicListData: ListItem<
  { name: string; description: string },
  { text: string; completed: boolean }
> = {
  id: "my-todos",
  name: "我的待办清单",
  description: "个人任务管理",
  items: [
    { id: "todo-1", text: "完成项目文档", completed: false },
    { id: "todo-2", text: "健身房锻炼", completed: true },
    { id: "todo-3", text: "学习 TypeScript", completed: false },
    { id: "todo-4", text: "准备周会分享", completed: false },
  ],
};

// 空列表数据
export const emptyBoardData: ListItems<{ title: string; color: string }, Task> =
  [
    {
      id: "empty-list-1",
      title: "空列表示例",
      color: "#6b7280",
      items: [],
    },
  ];

// 无效数据
export const invalidListData: ListItem<{ name: string }, { text: string }> = {
  id: "invalid-list",
  name: "包含无效项的列表",
  items: [
    { id: "valid-1", text: "正常项目 1" },
    { id: "valid-2", text: "正常项目 2" },
    { id: "", text: "无效项目 - 空 ID" } as { id: string; text: string },
    { id: "valid-3", text: "正常项目 3" },
  ],
};

// 大数据量
export const largeDataBoard: ListItems<{ title: string; color: string }, Task> =
  [
    {
      id: "large-list",
      title: "大量数据测试",
      color: "#6366f1",
      items: Array.from({ length: 50 }, (_, i) => ({
        id: `large-task-${i}`,
        content: `任务 ${i + 1}`,
        priority: (["high", "medium", "low"] as Priority[])[i % 3],
      })),
    },
  ];

// 多列表数据
export const multiListBoardData: ListItems<
  { title: string; color: string },
  Task
> = [
  {
    id: "list-1",
    title: "列表 1",
    color: "#3b82f6",
    items: [
      { id: "item-1", content: "项目 1", priority: "high" },
      { id: "item-2", content: "项目 2", priority: "medium" },
    ],
  },
  {
    id: "list-2",
    title: "列表 2",
    color: "#f59e0b",
    items: [{ id: "item-3", content: "项目 3", priority: "low" }],
  },
  {
    id: "list-3",
    title: "列表 3",
    color: "#10b981",
    items: [
      { id: "item-4", content: "项目 4", priority: "high" },
      { id: "item-5", content: "项目 5", priority: "medium" },
    ],
  },
  {
    id: "list-4",
    title: "列表 4",
    color: "#8b5cf6",
    items: [],
  },
];
