import { describe, expect, it } from "vitest";
import type { ListItems } from "../types";
import {
  arrayMove,
  handleItemDragBetweenLists,
  handleItemDragWithinList,
} from "./drag-handler";

describe("drag-handler", () => {
  describe("arrayMove", () => {
    it("应该正确移动数组元素", () => {
      const array = [1, 2, 3, 4, 5];
      const result = arrayMove(array, 0, 4);
      expect(result).toEqual([2, 3, 4, 5, 1]);
    });

    it("应该不修改原数组", () => {
      const array = [1, 2, 3];
      const original = [...array];
      arrayMove(array, 0, 2);
      expect(array).toEqual(original);
    });

    it("应该处理相同位置的移动", () => {
      const array = [1, 2, 3];
      const result = arrayMove(array, 1, 1);
      expect(result).toEqual([1, 2, 3]);
    });

    it("应该处理向前移动", () => {
      const array = ["a", "b", "c", "d"];
      const result = arrayMove(array, 3, 1);
      expect(result).toEqual(["a", "d", "b", "c"]);
    });
  });

  describe("handleItemDragWithinList", () => {
    it("应该在同一列表内重新排序项目", () => {
      const lists: ListItems<object, object> = [
        {
          id: "list-1",
          items: [{ id: "item-1" }, { id: "item-2" }, { id: "item-3" }],
        },
      ];

      const result = handleItemDragWithinList(lists, "list-1", 0, 2);

      expect(result[0].items).toEqual([
        { id: "item-2" },
        { id: "item-3" },
        { id: "item-1" },
      ]);
    });

    it("应该只修改目标列表", () => {
      const lists: ListItems<object, object> = [
        { id: "list-1", items: [{ id: "item-1" }, { id: "item-2" }] },
        { id: "list-2", items: [{ id: "item-3" }, { id: "item-4" }] },
      ];

      const result = handleItemDragWithinList(lists, "list-1", 0, 1);

      expect(result[0].items).toEqual([{ id: "item-2" }, { id: "item-1" }]);
      expect(result[1].items).toEqual([{ id: "item-3" }, { id: "item-4" }]);
    });

    it("应该处理没有 items 的列表", () => {
      const lists: ListItems<object, object> = [{ id: "list-1" }];

      const result = handleItemDragWithinList(lists, "list-1", 0, 1);

      expect(result[0]).toEqual({ id: "list-1" });
    });

    it("应该处理不存在的列表 ID", () => {
      const lists: ListItems<object, object> = [
        { id: "list-1", items: [{ id: "item-1" }] },
      ];

      const result = handleItemDragWithinList(lists, "non-existent", 0, 1);

      expect(result).toEqual(lists);
    });
  });

  describe("handleItemDragBetweenLists", () => {
    it("应该在不同列表间移动项目", () => {
      const lists: ListItems<object, object> = [
        { id: "list-1", items: [{ id: "item-1" }, { id: "item-2" }] },
        { id: "list-2", items: [{ id: "item-3" }] },
      ];

      const result = handleItemDragBetweenLists(
        lists,
        "list-1",
        "list-2",
        0,
        1,
      );

      expect(result[0].items).toEqual([{ id: "item-2" }]);
      expect(result[1].items).toEqual([{ id: "item-3" }, { id: "item-1" }]);
    });

    it("应该处理移动到空列表", () => {
      const lists: ListItems<object, object> = [
        { id: "list-1", items: [{ id: "item-1" }] },
        { id: "list-2", items: [] },
      ];

      const result = handleItemDragBetweenLists(
        lists,
        "list-1",
        "list-2",
        0,
        0,
      );

      expect(result[0].items).toEqual([]);
      expect(result[1].items).toEqual([{ id: "item-1" }]);
    });

    it("应该处理源列表不存在的情况", () => {
      const lists: ListItems<object, object> = [
        { id: "list-1", items: [{ id: "item-1" }] },
      ];

      const result = handleItemDragBetweenLists(
        lists,
        "non-existent",
        "list-1",
        0,
        0,
      );

      expect(result).toEqual(lists);
    });

    it("应该处理目标列表不存在的情况", () => {
      const lists: ListItems<object, object> = [
        { id: "list-1", items: [{ id: "item-1" }] },
      ];

      const result = handleItemDragBetweenLists(
        lists,
        "list-1",
        "non-existent",
        0,
        0,
      );

      expect(result).toEqual(lists);
    });

    it("应该处理列表没有 items 的情况", () => {
      const lists: ListItems<object, object> = [
        { id: "list-1" },
        { id: "list-2", items: [] },
      ];

      const result = handleItemDragBetweenLists(
        lists,
        "list-1",
        "list-2",
        0,
        0,
      );

      expect(result).toEqual(lists);
    });
  });
});
