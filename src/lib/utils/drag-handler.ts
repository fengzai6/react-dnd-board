import type { ListItems } from "../types";

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
export function handleItemDragWithinList<T extends object, I extends object>(
  lists: ListItems<T, I>,
  listId: string | number,
  sourceIndex: number,
  destinationIndex: number,
): ListItems<T, I> {
  return lists.map((list) => {
    // 只处理目标列表
    if (list.id !== listId) {
      return list;
    }

    // 如果列表没有 items，返回原列表
    if (!list.items) {
      return list;
    }

    const newItems = arrayMove(list.items, sourceIndex, destinationIndex);

    // 返回更新后的列表
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
export function handleItemDragBetweenLists<T extends object, I extends object>(
  lists: ListItems<T, I>,
  sourceListId: string | number,
  destinationListId: string | number,
  sourceIndex: number,
  destinationIndex: number,
): ListItems<T, I> {
  // 找到源列表和目标列表
  const sourceList = lists.find((l) => l.id === sourceListId);
  const destinationList = lists.find((l) => l.id === destinationListId);

  // 如果找不到列表，返回原数组
  if (!sourceList || !destinationList) {
    return lists;
  }

  // 如果列表没有 items，返回原数组
  if (!sourceList.items || !destinationList.items) {
    return lists;
  }

  // 创建源列表和目标列表的项目数组副本
  const sourceItems = Array.from(sourceList.items);
  const destinationItems =
    sourceListId === destinationListId
      ? sourceItems
      : Array.from(destinationList.items);

  // 从源列表移除项目
  const [movedItem] = sourceItems.splice(sourceIndex, 1);

  // 在目标列表插入项目
  destinationItems.splice(destinationIndex, 0, movedItem);

  // 更新列表数组
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
