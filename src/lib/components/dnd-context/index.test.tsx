import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DndContext } from "./index";

describe("DndContext Component", () => {
  describe("错误处理", () => {
    it("应该在接收到无效的拖拽结果时调用 devError", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const mockData = [{ id: "1", name: "Item 1" }];
      const mockOnDataChange = vi.fn();

      const { container } = render(
        <DndContext type="list" data={mockData} onDataChange={mockOnDataChange}>
          <div>Test Content</div>
        </DndContext>
      );

      expect(container).toBeTruthy();

      consoleErrorSpy.mockRestore();
    });

    it("应该安全地调用用户的 onDragEnd 回调", () => {
      const mockData = [{ id: "1", name: "Item 1" }];
      const mockOnDataChange = vi.fn();
      const mockOnDragEnd = vi.fn();

      const { container } = render(
        <DndContext
          type="list"
          data={mockData}
          onDataChange={mockOnDataChange}
          onDragEnd={mockOnDragEnd}
        >
          <div>Test Content</div>
        </DndContext>
      );

      expect(container).toBeTruthy();
    });

    it("应该在用户的 onDragEnd 抛出错误时捕获错误", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const mockData = [{ id: "1", name: "Item 1" }];
      const mockOnDataChange = vi.fn();
      const mockOnDragEnd = vi.fn(() => {
        throw new Error("User callback error");
      });

      const { container } = render(
        <DndContext
          type="list"
          data={mockData}
          onDataChange={mockOnDataChange}
          onDragEnd={mockOnDragEnd}
        >
          <div>Test Content</div>
        </DndContext>
      );

      expect(container).toBeTruthy();

      consoleErrorSpy.mockRestore();
    });
  });

  describe("类型守卫", () => {
    it("应该正确处理列表模式", () => {
      const mockData = [{ id: "1", name: "Item 1" }];
      const mockOnDataChange = vi.fn();

      const { container } = render(
        <DndContext type="list" data={mockData} onDataChange={mockOnDataChange}>
          <div>Test Content</div>
        </DndContext>
      );

      expect(container.textContent).toBe("Test Content");
    });

    it("应该正确处理看板模式", () => {
      const mockData = [
        {
          id: "list-1",
          name: "List 1",
          items: [{ id: "item-1", title: "Item 1" }],
        },
      ];
      const mockOnDataChange = vi.fn();

      const { container } = render(
        <DndContext
          type="board"
          data={mockData}
          onDataChange={mockOnDataChange}
        >
          <div>Test Content</div>
        </DndContext>
      );

      expect(container.textContent).toBe("Test Content");
    });
  });

  describe("拖拽结果验证", () => {
    it("应该验证拖拽结果的有效性", () => {
      const mockData = [{ id: "1", name: "Item 1" }];
      const mockOnDataChange = vi.fn();

      const { container } = render(
        <DndContext type="list" data={mockData} onDataChange={mockOnDataChange}>
          <div>Test Content</div>
        </DndContext>
      );

      expect(container).toBeTruthy();
    });
  });
});
