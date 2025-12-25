import type { BaseDndData, BoardList } from "@/lib/types";

/**
 * DndContext 的列表模式 Props
 */
export type ListModeProps<T> = {
  type: "list";
  data: T[];
  onDataChange?: (data: T[]) => void;
};

/**
 * DndContext 的看板模式 Props
 */
export type BoardModeProps<T extends BaseDndData, S extends BaseDndData> = {
  type: "board";
  data: BoardList<T, S>[];
  onDataChange?: (data: BoardList<T, S>[]) => void;
};

/**
 * DndContext 的组合 Props 类型
 */
export type DndContextModeProps<
  T extends BaseDndData,
  S extends BaseDndData = BaseDndData,
> = ListModeProps<T> | BoardModeProps<T, S>;

/**
 * 判断 DndContext 是否为列表模式
 * @param props - DndContext 的 props
 * @returns 如果是列表模式返回 true
 */
export function isListMode<
  T extends BaseDndData,
  S extends BaseDndData = BaseDndData,
>(props: DndContextModeProps<T, S>): props is ListModeProps<T> {
  return props.type === "list";
}

/**
 * 判断 DndContext 是否为看板模式
 * @param props - DndContext 的 props
 * @returns 如果是看板模式返回 true
 */
export function isBoardMode<
  T extends BaseDndData,
  S extends BaseDndData = BaseDndData,
>(props: DndContextModeProps<T, S>): props is BoardModeProps<T, S> {
  return props.type === "board";
}
