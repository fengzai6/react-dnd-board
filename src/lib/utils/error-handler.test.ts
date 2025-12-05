import { describe, expect, it, vi } from "vitest";
import type { DragResult } from "../types";
import {
  detectControlModeSwitch,
  devError,
  devWarning,
  isValidDragResult,
  isValidIndex,
  isValidState,
  safeCallOnDragEnd,
  safeExecute,
  StateRecovery,
} from "./error-handler";

describe("error-handler", () => {
  describe("safeCallOnDragEnd", () => {
    it("应该成功调用回调函数", () => {
      const callback = vi.fn();
      const result: DragResult = {
        type: "item",
        source: { droppableId: "list-1", index: 0 },
        destination: { droppableId: "list-1", index: 1 },
        draggableId: "item-1",
      };

      safeCallOnDragEnd(callback, result);

      expect(callback).toHaveBeenCalledWith(result);
    });

    it("应该捕获回调函数中的错误", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const callback = vi.fn(() => {
        throw new Error("Callback error");
      });
      const result: DragResult = {
        type: "item",
        source: { droppableId: "list-1", index: 0 },
        destination: null,
        draggableId: "item-1",
      };

      expect(() => safeCallOnDragEnd(callback, result)).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe("devWarning", () => {
    it("应该在开发模式下输出警告", () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      devWarning("Test warning");

      if (import.meta.env.MODE !== "production") {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "[DndBoard Warning]: Test warning",
        );
      }

      consoleWarnSpy.mockRestore();
    });
  });

  describe("devError", () => {
    it("应该在开发模式下输出错误", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      devError("Test error");

      if (import.meta.env.MODE !== "production") {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "[DndBoard Error]: Test error",
        );
      }

      consoleErrorSpy.mockRestore();
    });
  });

  describe("StateRecovery", () => {
    it("应该正确管理状态", () => {
      const recovery = new StateRecovery({ count: 0 });

      expect(recovery.getCurrentState()).toEqual({ count: 0 });

      recovery.updateState({ count: 1 });
      expect(recovery.getCurrentState()).toEqual({ count: 1 });
      expect(recovery.getPreviousState()).toEqual({ count: 0 });
    });

    it("应该能够恢复到上一个状态", () => {
      const recovery = new StateRecovery({ count: 0 });
      recovery.updateState({ count: 1 });
      recovery.updateState({ count: 2 });

      const recovered = recovery.recoverToPreviousState();

      expect(recovered).toEqual({ count: 1 });
      expect(recovery.getCurrentState()).toEqual({ count: 1 });
    });
  });

  describe("isValidState", () => {
    it("应该验证有效状态", () => {
      expect(isValidState([])).toBe(true);
      expect(isValidState({})).toBe(true);
      expect(isValidState([1, 2, 3])).toBe(true);
      expect(isValidState({ key: "value" })).toBe(true);
      expect(isValidState("string")).toBe(true);
      expect(isValidState(123)).toBe(true);
    });

    it("应该拒绝无效状态", () => {
      expect(isValidState(null)).toBe(false);
      expect(isValidState(undefined)).toBe(false);
    });
  });

  describe("safeExecute", () => {
    it("应该执行函数并返回结果", () => {
      const result = safeExecute(() => 42, 0);
      expect(result).toBe(42);
    });

    it("应该在函数抛出错误时返回默认值", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = safeExecute(
        () => {
          throw new Error("Test error");
        },
        "default",
        "Custom error message",
      );

      expect(result).toBe("default");
      consoleErrorSpy.mockRestore();
    });
  });

  describe("isValidIndex", () => {
    it("应该验证有效索引", () => {
      expect(isValidIndex(0, 5)).toBe(true);
      expect(isValidIndex(4, 5)).toBe(true);
      expect(isValidIndex(2, 5)).toBe(true);
    });

    it("应该拒绝无效索引", () => {
      expect(isValidIndex(-1, 5)).toBe(false);
      expect(isValidIndex(5, 5)).toBe(false);
      expect(isValidIndex(10, 5)).toBe(false);
    });
  });

  describe("isValidDragResult", () => {
    it("应该验证有效的拖拽结果", () => {
      const validResult: DragResult = {
        type: "item",
        source: { droppableId: "list-1", index: 0 },
        destination: { droppableId: "list-2", index: 1 },
        draggableId: "item-1",
      };

      expect(isValidDragResult(validResult)).toBe(true);
    });

    it("应该验证 destination 为 null 的情况", () => {
      const validResult: DragResult = {
        type: "list",
        source: { droppableId: "board", index: 0 },
        destination: null,
        draggableId: "list-1",
      };

      expect(isValidDragResult(validResult)).toBe(true);
    });

    it("应该拒绝缺少必需字段的结果", () => {
      expect(
        isValidDragResult({
          source: { droppableId: "list-1", index: 0 },
          destination: null,
          draggableId: "item-1",
        } as DragResult),
      ).toBe(false);
    });

    it("应该拒绝无效的 type", () => {
      expect(
        isValidDragResult({
          type: "invalid" as "item",
          source: { droppableId: "list-1", index: 0 },
          destination: null,
          draggableId: "item-1",
        }),
      ).toBe(false);
    });

    it("应该拒绝无效的 source", () => {
      expect(
        isValidDragResult({
          type: "item",
          source: { droppableId: "list-1" } as DragResult["source"],
          destination: null,
          draggableId: "item-1",
        }),
      ).toBe(false);
    });
  });

  describe("detectControlModeSwitch", () => {
    it("应该在模式切换时发出警告", () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      detectControlModeSwitch("TestComponent", false, true);

      if (import.meta.env.MODE !== "production") {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining("uncontrolled to controlled"),
        );
      }

      consoleWarnSpy.mockRestore();
    });

    it("应该在模式未切换时不发出警告", () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      detectControlModeSwitch("TestComponent", true, true);

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });
});
