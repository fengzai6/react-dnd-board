import { describe, expect, it } from "vitest";
import type { ListItems } from "../types";
import {
  isBoardMode,
  isListMode,
  type BoardModeProps,
  type ListModeProps,
} from "./type-guards";

describe("type-guards", () => {
  describe("isListMode", () => {
    it("应该正确识别列表模式", () => {
      const props: ListModeProps<object> = {
        type: "list",
        data: [{ id: "1" }, { id: "2" }],
        onDataChange: () => {},
      };

      expect(isListMode(props)).toBe(true);
    });

    it("应该拒绝看板模式", () => {
      const props: BoardModeProps<object, object> = {
        type: "board",
        data: [{ id: "1", items: [] }],
        onDataChange: () => {},
      };

      expect(isListMode(props)).toBe(false);
    });
  });

  describe("isBoardMode", () => {
    it("应该正确识别看板模式", () => {
      const props: BoardModeProps<object, object> = {
        type: "board",
        data: [
          { id: "list-1", items: [{ id: "item-1" }] },
          { id: "list-2", items: [] },
        ] as ListItems<object, object>,
        onDataChange: () => {},
      };

      expect(isBoardMode(props)).toBe(true);
    });

    it("应该拒绝列表模式", () => {
      const props: ListModeProps<object> = {
        type: "list",
        data: [{ id: "1" }, { id: "2" }],
        onDataChange: () => {},
      };

      expect(isBoardMode(props)).toBe(false);
    });
  });

  describe("类型守卫的类型推断", () => {
    it("应该正确推断列表模式的类型", () => {
      const props: ListModeProps<object> | BoardModeProps<object, object> = {
        type: "list",
        data: [{ id: "1" }],
        onDataChange: () => {},
      };

      if (isListMode(props)) {
        // TypeScript 应该推断 props.data 为 object[]
        const data: object[] = props.data;
        expect(Array.isArray(data)).toBe(true);
      }
    });

    it("应该正确推断看板模式的类型", () => {
      const props: ListModeProps<object> | BoardModeProps<object, object> = {
        type: "board",
        data: [{ id: "1", items: [] }] as ListItems<object, object>,
        onDataChange: () => {},
      };

      if (isBoardMode(props)) {
        // TypeScript 应该推断 props.data 为 ListItems<object, object>
        const data: ListItems<object, object> = props.data;
        expect(Array.isArray(data)).toBe(true);
      }
    });
  });
});
