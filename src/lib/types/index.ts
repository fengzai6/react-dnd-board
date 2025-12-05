// 基础拖拽项，必须有 id
export type DndItem<T extends object> = T & { id: string | number };

// 列表项，可以包含子项
export type ListItem<T extends object, I extends object> = DndItem<T> & {
  items?: DndItem<I>[];
};

// 列表项数组
export type ListItems<T extends object, I extends object> = ListItem<T, I>[];

// 拖拽结果类型
export interface DragResult {
  type: "list" | "item";
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
  draggableId: string;
}

// DndBoard 组件 Props
export interface DndBoardProps<T extends object, I extends object> {
  initialLists?: ListItems<T, I>;
  lists?: ListItems<T, I>;
  onListsChange?: (lists: ListItems<T, I>) => void;
  onDragEnd?: (result: DragResult) => void;

  className?: string;
  style?: React.CSSProperties;
  boardClassName?: string;
  listClassName?: string;
  itemClassName?: string;

  renderItem?: (item: DndItem<I>) => React.ReactNode;
  renderListHeader?: (list: ListItem<T, I>) => React.ReactNode;

  enableListDrag?: boolean;
  enableItemDrag?: boolean;
}
