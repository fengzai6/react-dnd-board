import type { BaseDndData } from "../types";

/**
 * 检查 id 是否有效（非空字符串、非 undefined、非 null）
 */
function isValidId(id: string | number | undefined | null): boolean {
  if (id === undefined || id === null) {
    return false;
  }
  if (typeof id === "string" && id.trim() === "") {
    return false;
  }
  return true;
}

/**
 * 验证单个 data 对象（必须有 id）
 * @returns 错误信息，验证通过返回 null
 */
export function validateData<T extends BaseDndData>(
  data: T | undefined | null,
  context?: string,
): string | null {
  const prefix = context ? `${context}: ` : "";

  if (!data) {
    return `${prefix}Data cannot be empty`;
  }

  if (!isValidId(data.id)) {
    return `${prefix}Missing required field: id`;
  }

  return null;
}

/**
 * 验证 items 数组（检查 id 存在性和唯一性）
 * @returns 错误信息，验证通过返回 null
 */
export function validateItems<S extends BaseDndData>(
  items: S[] | undefined | null,
  context?: string,
): string | null {
  const prefix = context ? `${context}: ` : "";
  const itemsArray = items ?? [];

  if (!Array.isArray(itemsArray)) {
    return `${prefix}Items must be an array`;
  }

  const itemIds = new Set<string | number>();

  for (let i = 0; i < itemsArray.length; i++) {
    const item = itemsArray[i];

    if (!item) {
      return `${prefix}Item at index ${i} cannot be empty`;
    }

    if (!isValidId(item.id)) {
      return `${prefix}Item at index ${i} is missing required field: id`;
    }

    if (itemIds.has(item.id)) {
      return `${prefix}Duplicate item ID detected: "${item.id}"`;
    }
    itemIds.add(item.id);
  }

  return null;
}

/**
 * 验证 Board 的 lists 数组（只验证 list id，items 由 DndList 验证）
 * @returns 错误信息，验证通过返回 null
 */
export function validateBoardLists<T extends BaseDndData>(
  lists: T[] | undefined | null,
): string | null {
  if (!lists) {
    return "Lists cannot be empty";
  }

  if (!Array.isArray(lists)) {
    return "Lists must be an array";
  }

  const listIds = new Set<string | number>();

  for (let i = 0; i < lists.length; i++) {
    const list = lists[i];

    if (!list) {
      return `List at index ${i} cannot be empty`;
    }

    if (!isValidId(list.id)) {
      return `List at index ${i} is missing required field: id`;
    }

    if (listIds.has(list.id)) {
      return `Duplicate list ID detected: "${list.id}"`;
    }
    listIds.add(list.id);
  }

  return null;
}

/**
 * 验证所有 lists 和 items 的 ID 唯一性
 * @returns 错误信息，验证通过返回 null
 */
export function validateUniqueIds<
  T extends BaseDndData & { items?: S[] },
  S extends BaseDndData,
>(lists: T[]): string | null {
  const listIds = new Set<string | number>();
  const itemIds = new Set<string | number>();

  for (const list of lists) {
    if (listIds.has(list.id)) {
      return `Duplicate list ID detected: "${list.id}"`;
    }
    listIds.add(list.id);

    if (list.items) {
      for (const item of list.items) {
        if (itemIds.has(item.id)) {
          return `Duplicate item ID detected: "${item.id}"`;
        }
        itemIds.add(item.id);
      }
    }
  }

  return null;
}

/**
 * 验证完整的 lists 数据（结构 + ID 唯一性）
 * @returns 错误信息，验证通过返回 null
 */
export function validateLists<
  T extends BaseDndData & { items?: S[] },
  S extends BaseDndData,
>(lists: T[] | undefined | null): string | null {
  const boardError = validateBoardLists(lists);
  if (boardError) return boardError;

  for (const list of lists!) {
    if (list.items) {
      const itemsError = validateItems(list.items, `List "${list.id}"`);
      if (itemsError) return itemsError;
    }
  }

  return null;
}
