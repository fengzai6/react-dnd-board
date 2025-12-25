// Import styles
import "../index.css";

// ============================================
// 核心类型导出
// ============================================
export type { BoardListProps, DndBoardProps } from "./components/dnd-board";
export type { DndItemProps } from "./components/dnd-item";
export type { DndListProps } from "./components/dnd-list";
export type {
  BaseDndData,
  BoardList,
  DndClassName,
  DragResult,
  DroppableClassName,
} from "./types";

// ============================================
// 组件导出
// ============================================
export { DndBoard } from "./components/dnd-board";
export { DndItem } from "./components/dnd-item";
export { DndList } from "./components/dnd-list";

// ============================================
// 工具函数导出
// ============================================
export {
  handleItemDragBetweenLists,
  handleItemDragWithinList,
  arrayMove as handleListDrag,
  validateLists,
  validateUniqueIds,
} from "./utils";
