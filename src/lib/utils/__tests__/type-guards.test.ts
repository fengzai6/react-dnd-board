import { describe, expect, it } from "vitest";
import type { BaseDndData } from "../../types";
import {
  isBoardMode,
  isListMode,
  type BoardModeProps,
  type ListModeProps,
} from "../type-guards";

type TestItem = BaseDndData;
type TestList = BaseDndData & { items?: TestItem[] };

describe("type-guards", () => {
  describe("isListMode", () => {
    it("应该正确识别列表模式", () => {
      const props: ListModeProps<TestItem> = {
        type: "list",
        data: [{ id: "1" }, { id: "2" }],
        onDataChange: () => {},
      };

      expect(isListMode(props)).toBe(true);
    });

    it("应该拒绝看板模式", () => {
      const props: BoardModeProps<TestList, TestItem> = {
        type: "board",
        data: [{ id: "1", items: [] }],
        onDataChange: () => {},
      };

      expect(isListMode(props)).toBe(false);
    });
  });

  describe("isBoardMode", () => {
    it("应该正确识别看板模式", () => {
      const props: BoardModeProps<TestList, TestItem> = {
        type: "board",
        data: [
          { id: "list-1", items: [{ id: "item-1" }] },
          { id: "list-2", items: [] },
        ],
        onDataChange: () => {},
      };

      expect(isBoardMode(props)).toBe(true);
    });

    it("应该拒绝列表模式", () => {
      const props: ListModeProps<TestItem> = {
        type: "list",
        data: [{ id: "1" }, { id: "2" }],
        onDataChange: () => {},
      };

      expect(isBoardMode(props)).toBe(false);
    });
  });

  describe("类型守卫的类型推断", () => {
    it("应该正确推断列表模式的类型", () => {
      const props:
        | ListModeProps<TestItem>
        | BoardModeProps<TestList, TestItem> = {
        type: "list",
        data: [{ id: "1" }],
        onDataChange: () => {},
      };

      if (isListMode(props)) {
        // TypeScript 应该推断 props.data 为 TestItem[]
        const data: TestItem[] = props.data;
        expect(Array.isArray(data)).toBe(true);
      }
    });

    it("应该正确推断看板模式的类型", () => {
      const props:
        | ListModeProps<TestItem>
        | BoardModeProps<TestList, TestItem> = {
        type: "board",
        data: [{ id: "1", items: [] }],
        onDataChange: () => {},
      };

      if (isBoardMode(props)) {
        // TypeScript 应该推断 props.data 为带有 items 的列表数组
        const data = props.data;
        expect(Array.isArray(data)).toBe(true);
      }
    });
  });
});
