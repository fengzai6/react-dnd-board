export interface BaseDndData {
  id: string | number;
  label?: string;
}

export type BoardList<T extends BaseDndData, S extends BaseDndData> = T & {
  items?: S[];
};

export type DndClassName = string | ((isDragging: boolean) => string);
export type DroppableClassName =
  | string
  | ((isDraggingOver: boolean, isDragging?: boolean) => string);

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
