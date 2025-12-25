import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DndBoard } from "../dnd-board";

describe("DndBoard 组件", () => {
  describe("基础渲染", () => {
    it("应该正确渲染列表", () => {
      render(
        <DndBoard
          lists={[
            { id: "list-1", label: "列表1", items: [] },
            { id: "list-2", label: "列表2", items: [] },
          ]}
          onListsChange={vi.fn()}
        />,
      );

      expect(screen.getByText("列表1")).toBeInTheDocument();
      expect(screen.getByText("列表2")).toBeInTheDocument();
    });

    it("应该渲染列表中的项目", () => {
      render(
        <DndBoard
          lists={[
            {
              id: "list-1",
              label: "列表1",
              items: [
                { id: "item-1", label: "项目1" },
                { id: "item-2", label: "项目2" },
              ],
            },
          ]}
          onListsChange={vi.fn()}
        />,
      );

      expect(screen.getByText("项目1")).toBeInTheDocument();
      expect(screen.getByText("项目2")).toBeInTheDocument();
    });

    it("应该在没有 label 时显示 id", () => {
      render(
        <DndBoard
          lists={[{ id: "list-1", items: [] }]}
          onListsChange={vi.fn()}
        />,
      );

      expect(screen.getByText("list-1")).toBeInTheDocument();
    });
  });

  describe("布局", () => {
    it("应该默认使用横向布局", () => {
      const { container } = render(
        <DndBoard
          lists={[{ id: "list-1", items: [] }]}
          onListsChange={vi.fn()}
        />,
      );

      const flexContainer = container.querySelector(".rdb\\:flex-row");
      expect(flexContainer).toBeInTheDocument();
    });

    it("应该支持纵向布局", () => {
      const { container } = render(
        <DndBoard
          lists={[{ id: "list-1", items: [] }]}
          onListsChange={vi.fn()}
          horizontal={false}
        />,
      );

      const flexContainer = container.querySelector(".rdb\\:flex-col");
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe("样式", () => {
    it("应该应用 rootClassName", () => {
      const { container } = render(
        <DndBoard
          lists={[{ id: "list-1", items: [] }]}
          onListsChange={vi.fn()}
          rootClassName="custom-root"
        />,
      );

      expect(container.querySelector(".custom-root")).toBeInTheDocument();
    });

    it("应该应用 className", () => {
      const { container } = render(
        <DndBoard
          lists={[{ id: "list-1", items: [] }]}
          onListsChange={vi.fn()}
          className="custom-class"
        />,
      );

      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("应该支持函数式 className", () => {
      const { container } = render(
        <DndBoard
          lists={[{ id: "list-1", items: [] }]}
          onListsChange={vi.fn()}
          className={(isDraggingOver) =>
            isDraggingOver ? "dragging-over" : "not-dragging"
          }
        />,
      );

      expect(container.querySelector(".not-dragging")).toBeInTheDocument();
    });
  });

  describe("listProps", () => {
    it("应该支持对象形式的 listProps", () => {
      render(
        <DndBoard
          lists={[{ id: "list-1", items: [] }]}
          onListsChange={vi.fn()}
          listProps={{ className: "custom-list-class" }}
        />,
      );

      expect(document.querySelector(".custom-list-class")).toBeInTheDocument();
    });

    it("应该支持函数形式的 listProps", () => {
      render(
        <DndBoard
          lists={[
            { id: "list-1", items: [] },
            { id: "list-2", items: [] },
          ]}
          onListsChange={vi.fn()}
          listProps={(_list, index) => ({
            className: `list-${index}`,
          })}
        />,
      );

      expect(document.querySelector(".list-0")).toBeInTheDocument();
      expect(document.querySelector(".list-1")).toBeInTheDocument();
    });
  });

  describe("空列表", () => {
    it("应该正确渲染空列表数组", () => {
      const { container } = render(
        <DndBoard lists={[]} onListsChange={vi.fn()} />,
      );

      expect(container.querySelector(".rdb\\:flex")).toBeInTheDocument();
    });
  });
});
