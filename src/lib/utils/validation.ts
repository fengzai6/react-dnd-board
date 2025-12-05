import type { DndItem, ListItem, ListItems } from "../types";

/**
 * 验证错误类
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * 验证 ID 的唯一性
 * @throws {ValidationError} 当发现重复的列表 ID 或项目 ID 时抛出错误
 */
export function validateUniqueIds<T extends object, I extends object>(
  lists: ListItems<T, I>
): void {
  const listIds = new Set<string | number>();
  const itemIds = new Set<string | number>();

  for (const list of lists) {
    // 检查列表 ID 唯一性
    if (listIds.has(list.id)) {
      throw new ValidationError(`Duplicate list ID detected: ${list.id}`);
    }
    listIds.add(list.id);

    // 检查项目 ID 唯一性
    if (list.items) {
      for (const item of list.items) {
        if (itemIds.has(item.id)) {
          throw new ValidationError(`Duplicate item ID detected: ${item.id}`);
        }
        itemIds.add(item.id);
      }
    }
  }
}

/**
 * 验证数据结构的有效性
 * @throws {ValidationError} 当数据结构不符合要求时抛出错误
 */
export function validateListStructure<T extends object, I extends object>(
  lists: unknown
): lists is ListItems<T, I> {
  // 检查是否为数组
  if (!Array.isArray(lists)) {
    throw new ValidationError("Lists must be an array");
  }

  // 检查每个列表项
  for (let i = 0; i < lists.length; i++) {
    const list = lists[i];

    // 检查列表是否为对象
    if (typeof list !== "object" || list === null) {
      throw new ValidationError(`List at index ${i} must be an object`);
    }

    // 检查列表是否有 id 字段
    if (!("id" in list)) {
      throw new ValidationError(
        `List at index ${i} is missing required field: id`
      );
    }

    // 检查 id 类型
    const id = (list as { id: T }).id;
    if (typeof id !== "string" && typeof id !== "number") {
      throw new ValidationError(
        `List at index ${i} has invalid id type: expected string or number, got ${typeof id}`
      );
    }

    // 检查 items 字段（如果存在）
    if ("items" in list) {
      const items = (list as { items: I[] }).items;

      // items 必须是数组
      if (!Array.isArray(items)) {
        throw new ValidationError(
          `List at index ${i} has invalid items field: expected array, got ${typeof items}`
        );
      }

      // 检查每个项目
      for (let j = 0; j < items.length; j++) {
        const item = items[j];

        // 检查项目是否为对象
        if (typeof item !== "object" || item === null) {
          throw new ValidationError(
            `Item at index ${j} in list ${i} must be an object`
          );
        }

        // 检查项目是否有 id 字段
        if (!("id" in item)) {
          throw new ValidationError(
            `Item at index ${j} in list ${i} is missing required field: id`
          );
        }

        // 检查项目 id 类型
        const itemId = (item as { id: I }).id;
        if (typeof itemId !== "string" && typeof itemId !== "number") {
          throw new ValidationError(
            `Item at index ${j} in list ${i} has invalid id type: expected string or number, got ${typeof itemId}`
          );
        }
      }
    }
  }

  return true;
}

/**
 * 验证列表数据的完整性（结构 + ID 唯一性）
 * @throws {ValidationError} 当数据无效时抛出错误
 */
export function validateLists<T extends object, I extends object>(
  lists: unknown
): lists is ListItems<T, I> {
  // 先验证结构
  validateListStructure<T, I>(lists);

  // 再验证 ID 唯一性
  validateUniqueIds<T, I>(lists as ListItems<T, I>);

  return true;
}

/**
 * 安全地验证列表数据，返回验证结果而不抛出错误
 * @returns 包含验证结果和错误信息的对象
 */
export function safeValidateLists<T extends object, I extends object>(
  lists: unknown
): {
  isValid: boolean;
  error?: string;
} {
  try {
    validateLists<T, I>(lists);
    return { isValid: true };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { isValid: false, error: error.message };
    }
    return { isValid: false, error: "Unknown validation error" };
  }
}

/**
 * 验证单个列表项
 */
export function validateListItem<T extends object, I extends object>(
  item: unknown
): item is ListItem<T, I> {
  if (typeof item !== "object" || item === null) {
    throw new ValidationError("List item must be an object");
  }

  if (!("id" in item)) {
    throw new ValidationError("List item is missing required field: id");
  }

  const id = (item as { id: I }).id;
  if (typeof id !== "string" && typeof id !== "number") {
    throw new ValidationError(
      `List item has invalid id type: expected string or number, got ${typeof id}`
    );
  }

  return true;
}

/**
 * 验证单个拖拽项
 */
export function validateDndItem<I extends object>(
  item: unknown
): item is DndItem<I> {
  if (typeof item !== "object" || item === null) {
    throw new ValidationError("Item must be an object");
  }

  if (!("id" in item)) {
    throw new ValidationError("Item is missing required field: id");
  }

  const id = (item as { id: unknown }).id;
  if (typeof id !== "string" && typeof id !== "number") {
    throw new ValidationError(
      `Item has invalid id type: expected string or number, got ${typeof id}`
    );
  }

  return true;
}

/**
 * 安全地验证单个列表项，返回验证结果而不抛出错误
 * @returns 包含验证结果和错误信息的对象
 */
export function safeValidateListItem<T extends object, I extends object>(
  item: unknown
): {
  isValid: boolean;
  error?: string;
} {
  try {
    validateListItem<T, I>(item);
    return { isValid: true };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { isValid: false, error: error.message };
    }
    return { isValid: false, error: "Unknown validation error" };
  }
}

/**
 * 安全地验证单个拖拽项，返回验证结果而不抛出错误
 * @returns 包含验证结果和错误信息的对象
 */
export function safeValidateDndItem<I extends object>(
  item: unknown
): {
  isValid: boolean;
  error?: string;
} {
  try {
    validateDndItem<I>(item);
    return { isValid: true };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { isValid: false, error: error.message };
    }
    return { isValid: false, error: "Unknown validation error" };
  }
}
