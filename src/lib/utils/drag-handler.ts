import type { BaseDndData } from "../types";

/** 带有 items 的列表类型 */
type ListWithItems<T extends BaseDndData, S extends BaseDndData> = T & {
  items?: S[];
};

/**
 * 处理列表拖拽，重新排序列表
 * @param array - 当前的列表数组
 * @param sourceIndex - 源列表的索引
 * @param destinationIndex - 目标位置的索引
 * @returns 重新排序后的列表数组
 */
export const arrayMove = <T>(
  array: T[],
  sourceIndex: number,
  destinationIndex: number,
) => {
  const copy = [...array];
  const [removed] = copy.splice(sourceIndex, 1);
  copy.splice(destinationIndex, 0, removed);
  return copy;
};

/**
 * 处理同列表内的项目拖拽，重新排序项目
 * @param lists - 当前的列表数组
 * @param listId - 列表的 ID
 * @param sourceIndex - 源项目的索引
 * @param destinationIndex - 目标位置的索引
 * @returns 更新后的列表数组
 */
export function handleItemDragWithinList<
  T extends BaseDndData,
  S extends BaseDndData,
>(
  lists: ListWithItems<T, S>[],
  listId: string | number,
  sourceIndex: number,
  destinationIndex: number,
): ListWithItems<T, S>[] {
  return lists.map((list) => {
    if (list.id !== listId) {
      return list;
    }

    if (!list.items) {
      return list;
    }

    const newItems = arrayMove(list.items, sourceIndex, destinationIndex);

    return {
      ...list,
      items: newItems,
    };
  });
}

/**
 * 处理跨列表的项目拖拽，将项目从一个列表移动到另一个列表
 * @param lists - 当前的列表数组
 * @param sourceListId - 源列表的 ID
 * @param destinationListId - 目标列表的 ID
 * @param sourceIndex - 源项目的索引
 * @param destinationIndex - 目标位置的索引
 * @returns 更新后的列表数组
 */
export function handleItemDragBetweenLists<
  T extends BaseDndData,
  S extends BaseDndData,
>(
  lists: ListWithItems<T, S>[],
  sourceListId: string | number,
  destinationListId: string | number,
  sourceIndex: number,
  destinationIndex: number,
): ListWithItems<T, S>[] {
  const sourceList = lists.find((l) => l.id === sourceListId);
  const destinationList = lists.find((l) => l.id === destinationListId);

  if (!sourceList || !destinationList) {
    return lists;
  }

  if (!sourceList.items || !destinationList.items) {
    return lists;
  }

  const sourceItems = Array.from(sourceList.items);
  const destinationItems =
    sourceListId === destinationListId
      ? sourceItems
      : Array.from(destinationList.items);

  const [movedItem] = sourceItems.splice(sourceIndex, 1);
  destinationItems.splice(destinationIndex, 0, movedItem);

  return lists.map((list) => {
    if (list.id === sourceListId) {
      return {
        ...list,
        items: sourceItems,
      };
    }
    if (list.id === destinationListId) {
      return {
        ...list,
        items: destinationItems,
      };
    }
    return list;
  });
}
