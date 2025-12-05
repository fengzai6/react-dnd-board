// Import styles
import "../index.css";

// ============================================
// 核心类型导出
// ============================================
export type {
  DndBoardProps,
  DndItem as DndItemType,
  DragResult,
  ListItem,
  ListItems,
} from "./types";

// ============================================
// 组件导出
// ============================================
export { DndBoard } from "./components/dnd-board";
export { DndItem, type DndItemProps } from "./components/dnd-item";
export { DndList, type DndListProps } from "./components/dnd-list";

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
