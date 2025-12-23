import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import type { BaseDndData } from "../../types";
import {
  validateBoardLists,
  validateData,
  validateItems,
  validateLists,
  validateUniqueIds,
} from "../validation";

type TestList = BaseDndData & { items?: BaseDndData[] };

/**
 * 生成具有唯一 ID 的列表数组
 */
const uniqueListsArbitrary = fc
  .array(
    fc.record({
      title: fc.string({ maxLength: 50 }),
      items: fc.array(fc.record({ content: fc.string({ maxLength: 100 }) }), {
        maxLength: 10,
      }),
    }),
    { maxLength: 10 },
  )
  .map((lists) => {
    const uniqueLists: TestList[] = [];
    const seenItemIds = new Set<string>();

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const listId = `list-${i}`;

      const uniqueItems: BaseDndData[] = [];
      if (list.items) {
        for (let j = 0; j < list.items.length; j++) {
          const itemId = `${listId}-item-${j}`;
          if (!seenItemIds.has(itemId)) {
            seenItemIds.add(itemId);
            uniqueItems.push({ id: itemId, ...list.items[j] });
          }
        }
      }

      uniqueLists.push({
        id: listId,
        ...list,
        items: uniqueItems,
      });
    }

    return uniqueLists;
  });

describe("validateData", () => {
  it("应该验证有效的 data 对象", () => {
    expect(validateData({ id: "test" })).toBeNull();
    expect(validateData({ id: 123 })).toBeNull();
    expect(validateData({ id: "test", label: "Test" })).toBeNull();
    expect(validateData({ id: 0 })).toBeNull();
  });

  it("应该返回错误当 data 为空", () => {
    expect(validateData(null)).toBe("Data cannot be empty");
    expect(validateData(undefined)).toBe("Data cannot be empty");
  });

  it("应该返回错误当缺少 id", () => {
    expect(validateData({} as BaseDndData)).toBe("Missing required field: id");
  });

  it("应该返回错误当 id 为空字符串", () => {
    expect(validateData({ id: "" })).toBe("Missing required field: id");
    expect(validateData({ id: "   " })).toBe("Missing required field: id");
  });

  it("应该支持 context 前缀", () => {
    expect(validateData(null, "List")).toBe("List: Data cannot be empty");
  });
});

describe("validateItems", () => {
  it("应该验证有效的 items 数组", () => {
    expect(validateItems([{ id: "item-1" }, { id: "item-2" }])).toBeNull();
    expect(validateItems([])).toBeNull();
    expect(validateItems(undefined)).toBeNull();
  });

  it("应该返回错误当 item 缺少 id", () => {
    const result = validateItems([{ id: "item-1" }, {} as BaseDndData]);
    expect(result).toContain("Item at index 1 is missing required field: id");
  });

  it("应该返回错误当 item id 为空字符串", () => {
    const result = validateItems([{ id: "item-1" }, { id: "" }]);
    expect(result).toContain("Item at index 1 is missing required field: id");

    const result2 = validateItems([{ id: "   " }]);
    expect(result2).toContain("Item at index 0 is missing required field: id");
  });

  it("应该返回错误当存在重复 id", () => {
    const result = validateItems([{ id: "item-1" }, { id: "item-1" }]);
    expect(result).toContain("Duplicate item ID detected");
  });

  it("应该支持 context 前缀", () => {
    const result = validateItems([{} as BaseDndData], 'List "test"');
    expect(result).toContain('List "test":');
  });
});

describe("validateBoardLists", () => {
  it("应该验证有效的 lists 数组", () => {
    expect(validateBoardLists([{ id: "list-1" }, { id: "list-2" }])).toBeNull();
  });

  it("应该返回错误当 lists 为空", () => {
    expect(validateBoardLists(null)).toBe("Lists cannot be empty");
    expect(validateBoardLists(undefined)).toBe("Lists cannot be empty");
  });

  it("应该返回错误当 lists 不是数组", () => {
    expect(validateBoardLists("not array" as unknown as BaseDndData[])).toBe(
      "Lists must be an array",
    );
  });

  it("应该返回错误当 list 缺少 id", () => {
    const result = validateBoardLists([{} as BaseDndData]);
    expect(result).toContain("List at index 0 is missing required field: id");
  });

  it("应该返回错误当 list id 为空字符串", () => {
    const result = validateBoardLists([{ id: "" }]);
    expect(result).toContain("List at index 0 is missing required field: id");

    const result2 = validateBoardLists([{ id: "list-1" }, { id: "   " }]);
    expect(result2).toContain("List at index 1 is missing required field: id");
  });

  it("应该返回错误当存在重复 list id", () => {
    const result = validateBoardLists([{ id: "list-1" }, { id: "list-1" }]);
    expect(result).toContain("Duplicate list ID detected");
  });
});

describe("validateUniqueIds", () => {
  it("应该验证唯一的 ID", () => {
    const lists: TestList[] = [
      { id: "list-1", items: [{ id: "item-1" }, { id: "item-2" }] },
      { id: "list-2", items: [{ id: "item-3" }] },
    ];
    expect(validateUniqueIds(lists)).toBeNull();
  });

  it("应该返回错误当存在重复 list id", () => {
    const lists: TestList[] = [
      { id: "list-1", items: [] },
      { id: "list-1", items: [] },
    ];
    expect(validateUniqueIds(lists)).toContain("Duplicate list ID detected");
  });

  it("应该返回错误当存在重复 item id", () => {
    const lists: TestList[] = [
      { id: "list-1", items: [{ id: "item-1" }] },
      { id: "list-2", items: [{ id: "item-1" }] },
    ];
    expect(validateUniqueIds(lists)).toContain("Duplicate item ID detected");
  });
});

describe("validateLists", () => {
  it("应该验证完整的 lists 数据", () => {
    const lists: TestList[] = [
      { id: "list-1", items: [{ id: "item-1" }] },
      { id: "list-2", items: [{ id: "item-2" }] },
    ];
    expect(validateLists(lists)).toBeNull();
  });

  it("应该返回 board 验证错误", () => {
    expect(validateLists(null)).toBe("Lists cannot be empty");
  });

  it("应该返回 items 验证错误", () => {
    const lists: TestList[] = [
      { id: "list-1", items: [{ id: "item-1" }, { id: "item-1" }] },
    ];
    const result = validateLists(lists);
    expect(result).toContain("Duplicate item ID detected");
  });
});

describe("Property: 重复 list ID 检测", () => {
  it("应该检测任意位置的重复 list ID", () => {
    fc.assert(
      fc.property(uniqueListsArbitrary, fc.nat(), (lists, duplicateIndex) => {
        if (lists.length < 2) return true;

        const listsWithDuplicate = [...lists];
        const targetIndex = duplicateIndex % lists.length;
        const sourceIndex = (targetIndex + 1) % lists.length;

        listsWithDuplicate[targetIndex] = {
          ...listsWithDuplicate[targetIndex],
          id: listsWithDuplicate[sourceIndex].id,
        };

        const error = validateUniqueIds(listsWithDuplicate);
        expect(error).toContain("Duplicate list ID detected");
        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("应该通过唯一 ID 的验证", () => {
    fc.assert(
      fc.property(uniqueListsArbitrary, (lists) => {
        const error = validateUniqueIds(lists);
        expect(error).toBeNull();
        return true;
      }),
      { numRuns: 100 },
    );
  });
});

describe("Property: 重复 item ID 检测", () => {
  it("应该检测同一列表内的重复 item ID", () => {
    fc.assert(
      fc.property(uniqueListsArbitrary, fc.nat(), (lists, listIndexRaw) => {
        const listsWithItems = lists.filter(
          (list) => list.items && list.items.length >= 2,
        );

        if (listsWithItems.length === 0) return true;

        const listIndex = listIndexRaw % listsWithItems.length;
        const targetList = listsWithItems[listIndex];
        const originalListIndex = lists.findIndex(
          (l) => l.id === targetList.id,
        );

        const listsWithDuplicate = [...lists];
        const modifiedItems = [...targetList.items!];
        modifiedItems[1] = { ...modifiedItems[1], id: modifiedItems[0].id };

        listsWithDuplicate[originalListIndex] = {
          ...listsWithDuplicate[originalListIndex],
          items: modifiedItems,
        };

        const error = validateUniqueIds(listsWithDuplicate);
        expect(error).toContain("Duplicate item ID detected");
        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("应该检测跨列表的重复 item ID", () => {
    fc.assert(
      fc.property(uniqueListsArbitrary, fc.nat(), (lists, list1Raw) => {
        const listsWithItems = lists.filter(
          (list) => list.items && list.items.length >= 1,
        );

        if (listsWithItems.length < 2) return true;

        const list1Index = list1Raw % listsWithItems.length;
        const list2Index = (list1Index + 1) % listsWithItems.length;

        const list1 = listsWithItems[list1Index];
        const list2 = listsWithItems[list2Index];
        const originalList2Index = lists.findIndex((l) => l.id === list2.id);

        const listsWithDuplicate = [...lists];
        const modifiedList2Items = [...list2.items!];
        modifiedList2Items[0] = {
          ...modifiedList2Items[0],
          id: list1.items![0].id,
        };

        listsWithDuplicate[originalList2Index] = {
          ...listsWithDuplicate[originalList2Index],
          items: modifiedList2Items,
        };

        const error = validateUniqueIds(listsWithDuplicate);
        expect(error).toContain("Duplicate item ID detected");
        return true;
      }),
      { numRuns: 100 },
    );
  });
});

describe("空数组处理", () => {
  it("应该通过空 lists 数组的验证", () => {
    expect(validateBoardLists([])).toBeNull();
    expect(validateUniqueIds([])).toBeNull();
  });

  it("应该处理带空 items 的列表", () => {
    const lists: TestList[] = [
      { id: "list-1", items: [] },
      { id: "list-2", items: [] },
    ];
    expect(validateLists(lists)).toBeNull();
  });

  it("应该处理没有 items 字段的列表", () => {
    const lists: TestList[] = [{ id: "list-1" }, { id: "list-2" }];
    expect(validateUniqueIds(lists)).toBeNull();
  });
});

describe("有效 ID 类型", () => {
  it("应该接受 string 和 number 类型的 ID", () => {
    const lists: TestList[] = [
      { id: "string-id", items: [{ id: 1 }, { id: "item-2" }] },
      { id: 123, items: [{ id: "item-3" }, { id: 456 }] },
    ];
    expect(validateLists(lists)).toBeNull();
  });
});
