import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import type { DndItem, ListItem, ListItems } from "../types";
import {
  validateListStructure,
  validateUniqueIds,
  ValidationError,
} from "./validation";

/**
 * 生成有效的项目 ID
 */
const itemIdArbitrary = fc.oneof(
  fc.string({ minLength: 1, maxLength: 20 }),
  fc.integer({ min: 1, max: 10000 })
);

/**
 * 生成有效的拖拽项目
 */
const dndItemArbitrary = fc.record({
  id: itemIdArbitrary,
  content: fc.string({ maxLength: 100 }),
});

/**
 * 生成有效的列表项
 */
const listItemArbitrary = fc.record({
  id: itemIdArbitrary,
  title: fc.string({ maxLength: 50 }),
  items: fc.array(dndItemArbitrary, { maxLength: 10 }),
});

/**
 * 生成具有唯一 ID 的列表数组
 * 确保所有列表 ID 和项目 ID 都是唯一的
 */
const uniqueListsArbitrary = fc
  .array(listItemArbitrary, { maxLength: 10 })
  .map((lists) => {
    // 确保所有 ID 唯一
    const uniqueLists: ListItem<object, object>[] = [];
    const seenListIds = new Set<string | number>();
    const seenItemIds = new Set<string | number>();

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];

      // 生成唯一的列表 ID
      let listId: string | number = `list-${i}`;
      while (seenListIds.has(listId)) {
        listId = `list-${i}-${Math.random()}`;
      }
      seenListIds.add(listId);

      // 生成唯一的项目 ID
      const uniqueItems: DndItem<object>[] = [];
      if (list.items) {
        for (let j = 0; j < list.items.length; j++) {
          const item = list.items[j];
          let itemId: string | number = `${listId}-item-${j}`;
          while (seenItemIds.has(itemId)) {
            itemId = `${listId}-item-${j}-${Math.random()}`;
          }
          seenItemIds.add(itemId);

          uniqueItems.push({
            ...item,
            id: itemId,
          });
        }
      }

      uniqueLists.push({
        ...list,
        id: listId,
        items: uniqueItems,
      });
    }

    return uniqueLists as ListItems<object, object>;
  });

/**
 * Feature: dnd-component-library, Property 18: Duplicate list IDs throw errors
 *
 * 这个属性测试验证：对于任何包含重复列表 ID 的列表数组，
 * validateUniqueIds 函数应该抛出 ValidationError
 */
describe("Property 18: Duplicate list IDs throw errors", () => {
  it("should throw ValidationError when lists contain duplicate IDs", () => {
    fc.assert(
      fc.property(uniqueListsArbitrary, fc.nat(), (lists, duplicateIndex) => {
        // 跳过空数组或只有一个列表的情况
        if (lists.length < 2) return true;

        // 创建一个包含重复 ID 的列表数组
        const listsWithDuplicate = [...lists];
        const targetIndex = duplicateIndex % lists.length;
        const sourceIndex = (targetIndex + 1) % lists.length;

        // 将目标索引的列表 ID 设置为与源索引相同
        listsWithDuplicate[targetIndex] = {
          ...listsWithDuplicate[targetIndex],
          id: listsWithDuplicate[sourceIndex].id,
        };

        // 验证：应该抛出 ValidationError
        expect(() => validateUniqueIds(listsWithDuplicate)).toThrow(
          ValidationError
        );

        // 验证：错误消息应该包含重复的 ID
        try {
          validateUniqueIds(listsWithDuplicate);
          // 如果没有抛出错误，测试失败
          return false;
        } catch (error) {
          if (error instanceof ValidationError) {
            // 验证错误消息格式
            expect(error.message).toContain("Duplicate list ID detected");
            expect(error.message).toContain(
              String(listsWithDuplicate[sourceIndex].id)
            );
            return true;
          }
          // 如果抛出的不是 ValidationError，测试失败
          return false;
        }
      }),
      { numRuns: 100 }
    );
  });

  it("should not throw error when all list IDs are unique", () => {
    fc.assert(
      fc.property(uniqueListsArbitrary, (lists) => {
        // 对于具有唯一 ID 的列表，不应该抛出错误
        expect(() => validateUniqueIds(lists)).not.toThrow();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it("should detect duplicate list IDs regardless of position", () => {
    fc.assert(
      fc.property(
        uniqueListsArbitrary,
        fc.nat(),
        fc.nat(),
        (lists, index1Raw, index2Raw) => {
          // 需要至少 2 个列表
          if (lists.length < 2) return true;

          const index1 = index1Raw % lists.length;
          let index2 = index2Raw % lists.length;

          // 确保两个索引不同
          if (index1 === index2) {
            index2 = (index2 + 1) % lists.length;
          }

          // 创建包含重复 ID 的列表
          const listsWithDuplicate = [...lists];
          listsWithDuplicate[index2] = {
            ...listsWithDuplicate[index2],
            id: listsWithDuplicate[index1].id,
          };

          // 应该抛出错误
          expect(() => validateUniqueIds(listsWithDuplicate)).toThrow(
            ValidationError
          );

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: dnd-component-library, Property 19: Duplicate item IDs throw errors
 *
 * 这个属性测试验证：对于任何列表数组，如果其中任何列表包含重复的项目 ID，
 * validateUniqueIds 函数应该抛出 ValidationError
 */
describe("Property 19: Duplicate item IDs throw errors", () => {
  it("should throw ValidationError when any list contains duplicate item IDs", () => {
    fc.assert(
      fc.property(
        uniqueListsArbitrary,
        fc.nat(),
        fc.nat(),
        (lists, listIndexRaw, itemIndexRaw) => {
          // 找到至少有 2 个项目的列表
          const listsWithItems = lists.filter(
            (list) => list.items && list.items.length >= 2
          );

          // 如果没有符合条件的列表，跳过此测试
          if (listsWithItems.length === 0) return true;

          // 选择一个列表
          const listIndex = listIndexRaw % listsWithItems.length;
          const targetList = listsWithItems[listIndex];

          // 在原始列表数组中找到这个列表的索引
          const originalListIndex = lists.findIndex(
            (l) => l.id === targetList.id
          );

          // 创建包含重复项目 ID 的列表数组
          const listsWithDuplicate = [...lists];
          const itemsCount = targetList.items!.length;
          const duplicateItemIndex = itemIndexRaw % itemsCount;
          const sourceItemIndex = (duplicateItemIndex + 1) % itemsCount;

          // 复制列表并修改项目
          const modifiedItems = [...targetList.items!];
          modifiedItems[duplicateItemIndex] = {
            ...modifiedItems[duplicateItemIndex],
            id: modifiedItems[sourceItemIndex].id,
          };

          listsWithDuplicate[originalListIndex] = {
            ...listsWithDuplicate[originalListIndex],
            items: modifiedItems,
          };

          // 验证：应该抛出 ValidationError
          expect(() => validateUniqueIds(listsWithDuplicate)).toThrow(
            ValidationError
          );

          // 验证：错误消息应该包含重复的项目 ID
          try {
            validateUniqueIds(listsWithDuplicate);
            // 如果没有抛出错误，测试失败
            return false;
          } catch (error) {
            if (error instanceof ValidationError) {
              // 验证错误消息格式
              expect(error.message).toContain("Duplicate item ID detected");
              expect(error.message).toContain(
                String(modifiedItems[sourceItemIndex].id)
              );
              return true;
            }
            // 如果抛出的不是 ValidationError，测试失败
            return false;
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not throw error when all item IDs are unique across all lists", () => {
    fc.assert(
      fc.property(uniqueListsArbitrary, (lists) => {
        // 对于具有唯一项目 ID 的列表，不应该抛出错误
        expect(() => validateUniqueIds(lists)).not.toThrow();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it("should detect duplicate item IDs within the same list", () => {
    fc.assert(
      fc.property(
        uniqueListsArbitrary,
        fc.nat(),
        fc.nat(),
        fc.nat(),
        (lists, listIndexRaw, item1Raw, item2Raw) => {
          // 找到至少有 2 个项目的列表
          const listsWithItems = lists.filter(
            (list) => list.items && list.items.length >= 2
          );

          if (listsWithItems.length === 0) return true;

          const listIndex = listIndexRaw % listsWithItems.length;
          const targetList = listsWithItems[listIndex];
          const originalListIndex = lists.findIndex(
            (l) => l.id === targetList.id
          );

          const itemsCount = targetList.items!.length;
          const item1Index = item1Raw % itemsCount;
          let item2Index = item2Raw % itemsCount;

          // 确保两个索引不同
          if (item1Index === item2Index) {
            item2Index = (item2Index + 1) % itemsCount;
          }

          // 创建包含重复项目 ID 的列表
          const listsWithDuplicate = [...lists];
          const modifiedItems = [...targetList.items!];
          modifiedItems[item2Index] = {
            ...modifiedItems[item2Index],
            id: modifiedItems[item1Index].id,
          };

          listsWithDuplicate[originalListIndex] = {
            ...listsWithDuplicate[originalListIndex],
            items: modifiedItems,
          };

          // 应该抛出错误
          expect(() => validateUniqueIds(listsWithDuplicate)).toThrow(
            ValidationError
          );

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should detect duplicate item IDs across different lists", () => {
    fc.assert(
      fc.property(
        uniqueListsArbitrary,
        fc.nat(),
        fc.nat(),
        (lists, list1Raw, list2Raw) => {
          // 需要至少 2 个列表，且每个列表至少有 1 个项目
          const listsWithItems = lists.filter(
            (list) => list.items && list.items.length >= 1
          );

          if (listsWithItems.length < 2) return true;

          const list1Index = list1Raw % listsWithItems.length;
          let list2Index = list2Raw % listsWithItems.length;

          // 确保两个列表索引不同
          if (list1Index === list2Index) {
            list2Index = (list2Index + 1) % listsWithItems.length;
          }

          const list1 = listsWithItems[list1Index];
          const list2 = listsWithItems[list2Index];

          const originalList2Index = lists.findIndex((l) => l.id === list2.id);

          // 创建包含重复项目 ID 的列表（跨列表）
          const listsWithDuplicate = [...lists];
          const modifiedList2Items = [...list2.items!];

          // 将 list2 的第一个项目 ID 设置为 list1 的第一个项目 ID
          modifiedList2Items[0] = {
            ...modifiedList2Items[0],
            id: list1.items![0].id,
          };

          listsWithDuplicate[originalList2Index] = {
            ...listsWithDuplicate[originalList2Index],
            items: modifiedList2Items,
          };

          // 应该抛出错误
          expect(() => validateUniqueIds(listsWithDuplicate)).toThrow(
            ValidationError
          );

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * 单元测试：空数组处理
 * Requirements: 9.1
 */
describe("Empty array handling", () => {
  it("should not throw error for empty lists array", () => {
    const emptyLists: ListItems<object, object> = [];
    expect(() => validateUniqueIds(emptyLists)).not.toThrow();
  });

  it("should validate empty lists array structure", () => {
    const emptyLists: unknown = [];
    expect(() => validateListStructure(emptyLists)).not.toThrow();
  });

  it("should handle lists with empty items arrays", () => {
    const listsWithEmptyItems: ListItems<object, object> = [
      { id: "list-1", items: [] },
      { id: "list-2", items: [] },
    ];
    expect(() => validateUniqueIds(listsWithEmptyItems)).not.toThrow();
    expect(() => validateListStructure(listsWithEmptyItems)).not.toThrow();
  });

  it("should handle lists without items field", () => {
    const listsWithoutItems: ListItems<object, object> = [
      { id: "list-1" },
      { id: "list-2" },
    ];
    expect(() => validateUniqueIds(listsWithoutItems)).not.toThrow();
    expect(() => validateListStructure(listsWithoutItems)).not.toThrow();
  });
});

/**
 * 单元测试：缺少必需字段的处理
 * Requirements: 9.2
 */
describe("Missing required fields handling", () => {
  it("should throw error when list is missing id field", () => {
    const listsWithoutId = [{ title: "List without ID", items: [] }];
    expect(() => validateListStructure(listsWithoutId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithoutId)).toThrow(
      "missing required field: id"
    );
  });

  it("should throw error when list id is null", () => {
    const listsWithNullId = [{ id: null, items: [] }];
    expect(() => validateListStructure(listsWithNullId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithNullId)).toThrow(
      "invalid id type"
    );
  });

  it("should throw error when list id is undefined", () => {
    const listsWithUndefinedId = [{ id: undefined, items: [] }];
    expect(() => validateListStructure(listsWithUndefinedId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithUndefinedId)).toThrow(
      "invalid id type"
    );
  });

  it("should throw error when item is missing id field", () => {
    const listsWithItemMissingId = [
      {
        id: "list-1",
        items: [{ content: "Item without ID" }],
      },
    ];
    expect(() => validateListStructure(listsWithItemMissingId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithItemMissingId)).toThrow(
      "missing required field: id"
    );
  });

  it("should throw error when item id is null", () => {
    const listsWithNullItemId = [
      {
        id: "list-1",
        items: [{ id: null, content: "Item" }],
      },
    ];
    expect(() => validateListStructure(listsWithNullItemId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithNullItemId)).toThrow(
      "invalid id type"
    );
  });

  it("should throw error when item id is undefined", () => {
    const listsWithUndefinedItemId = [
      {
        id: "list-1",
        items: [{ id: undefined, content: "Item" }],
      },
    ];
    expect(() => validateListStructure(listsWithUndefinedItemId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithUndefinedItemId)).toThrow(
      "invalid id type"
    );
  });

  it("should throw error when list is not an object", () => {
    const listsWithNonObject = ["not an object"];
    expect(() => validateListStructure(listsWithNonObject)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithNonObject)).toThrow(
      "must be an object"
    );
  });

  it("should throw error when item is not an object", () => {
    const listsWithNonObjectItem = [
      {
        id: "list-1",
        items: ["not an object"],
      },
    ];
    expect(() => validateListStructure(listsWithNonObjectItem)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithNonObjectItem)).toThrow(
      "must be an object"
    );
  });

  it("should throw error when items field is not an array", () => {
    const listsWithNonArrayItems = [
      {
        id: "list-1",
        items: "not an array",
      },
    ];
    expect(() => validateListStructure(listsWithNonArrayItems)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithNonArrayItems)).toThrow(
      "expected array"
    );
  });

  it("should throw error when lists is not an array", () => {
    const notAnArray = { id: "list-1", items: [] };
    expect(() => validateListStructure(notAnArray)).toThrow(ValidationError);
    expect(() => validateListStructure(notAnArray)).toThrow(
      "Lists must be an array"
    );
  });

  it("should accept valid id types (string and number)", () => {
    const listsWithValidIds: ListItems<object, object> = [
      { id: "string-id", items: [{ id: 1 }, { id: "item-2" }] },
      { id: 123, items: [{ id: "item-3" }, { id: 456 }] },
    ];
    expect(() => validateListStructure(listsWithValidIds)).not.toThrow();
    expect(() => validateUniqueIds(listsWithValidIds)).not.toThrow();
  });

  it("should throw error for invalid id types (boolean, object, etc)", () => {
    const listsWithBooleanId = [{ id: true, items: [] }];
    expect(() => validateListStructure(listsWithBooleanId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithBooleanId)).toThrow(
      "invalid id type"
    );

    const listsWithObjectId = [{ id: {}, items: [] }];
    expect(() => validateListStructure(listsWithObjectId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithObjectId)).toThrow(
      "invalid id type"
    );

    const listsWithArrayId = [{ id: [], items: [] }];
    expect(() => validateListStructure(listsWithArrayId)).toThrow(
      ValidationError
    );
    expect(() => validateListStructure(listsWithArrayId)).toThrow(
      "invalid id type"
    );
  });
});
