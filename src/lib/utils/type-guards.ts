import type { ListItems } from "@/lib/types";

/**
 * DndContext 的列表模式 Props
 */
export type ListModeProps<T> = {
  type: "list";
  data: T[];
  onDataChange: (data: T[]) => void;
};

/**
 * DndContext 的看板模式 Props
 */
export type BoardModeProps<T extends object, I extends object> = {
  type: "board";
  data: ListItems<T, I>;
  onDataChange: (data: ListItems<T, I>) => void;
};

/**
 * DndContext 的组合 Props 类型
 */
export type DndContextModeProps<T extends object, I extends object = object> =
  | ListModeProps<T>
  | BoardModeProps<T, I>;

/**
 * 判断 DndContext 是否为列表模式
 * @param props - DndContext 的 props
 * @returns 如果是列表模式返回 true
 */
export function isListMode<T extends object, I extends object = object>(
  props: DndContextModeProps<T, I>
): props is ListModeProps<T> {
  return props.type === "list";
}

/**
 * 判断 DndContext 是否为看板模式
 * @param props - DndContext 的 props
 * @returns 如果是看板模式返回 true
 */
export function isBoardMode<T extends object, I extends object = object>(
  props: DndContextModeProps<T, I>
): props is BoardModeProps<T, I> {
  return props.type === "board";
}
