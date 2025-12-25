import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DndContext } from "../dnd-context/index";

describe("DndContext 组件", () => {
  describe("基础渲染", () => {
    it("应该正确渲染子元素", () => {
      render(
        <DndContext type="list" data={[{ id: "1" }]} onDataChange={vi.fn()}>
          <div>测试内容</div>
        </DndContext>,
      );

      expect(screen.getByText("测试内容")).toBeInTheDocument();
    });
  });

  describe("列表模式", () => {
    it("应该正确处理列表模式的数据", () => {
      const mockOnDataChange = vi.fn();

      render(
        <DndContext
          type="list"
          data={[{ id: "1" }, { id: "2" }]}
          onDataChange={mockOnDataChange}
        >
          <div>列表内容</div>
        </DndContext>,
      );

      expect(screen.getByText("列表内容")).toBeInTheDocument();
    });
  });

  describe("看板模式", () => {
    it("应该正确处理看板模式的数据", () => {
      const mockOnDataChange = vi.fn();

      render(
        <DndContext
          type="board"
          data={[
            { id: "list-1", items: [{ id: "item-1" }] },
            { id: "list-2", items: [] },
          ]}
          onDataChange={mockOnDataChange}
        >
          <div>看板内容</div>
        </DndContext>,
      );

      expect(screen.getByText("看板内容")).toBeInTheDocument();
    });
  });

  describe("onDragEnd 回调", () => {
    it("应该接受 onDragEnd 回调", () => {
      const mockOnDragEnd = vi.fn();

      render(
        <DndContext
          type="list"
          data={[{ id: "1" }]}
          onDataChange={vi.fn()}
          onDragEnd={mockOnDragEnd}
        >
          <div>内容</div>
        </DndContext>,
      );

      expect(screen.getByText("内容")).toBeInTheDocument();
    });
  });

  describe("dragDropContextProps", () => {
    it("应该支持透传 dragDropContextProps", () => {
      const mockOnBeforeDragStart = vi.fn();

      render(
        <DndContext
          type="list"
          data={[{ id: "1" }]}
          onDataChange={vi.fn()}
          dragDropContextProps={{
            onBeforeDragStart: mockOnBeforeDragStart,
          }}
        >
          <div>内容</div>
        </DndContext>,
      );

      expect(screen.getByText("内容")).toBeInTheDocument();
    });
  });
});
