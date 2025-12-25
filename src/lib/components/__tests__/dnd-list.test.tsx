import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DndList } from "../dnd-list";

// 包装组件，模拟 Board 环境
const BoardWrapper = ({ children }: { children: React.ReactNode }) => (
  <DragDropContext onDragEnd={vi.fn()}>
    <Droppable droppableId="board" type="list" direction="horizontal">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

describe("DndList 组件", () => {
  describe("独立模式", () => {
    it("应该正确渲染列表", () => {
      render(
        <DndList
          data={{ id: "list-1", label: "测试列表" }}
          items={[]}
          onItemsChange={vi.fn()}
        />,
      );

      expect(screen.getByText("测试列表")).toBeInTheDocument();
    });

    it("应该渲染列表项目", () => {
      render(
        <DndList
          data={{ id: "list-1" }}
          items={[
            { id: "item-1", label: "项目1" },
            { id: "item-2", label: "项目2" },
          ]}
          onItemsChange={vi.fn()}
        />,
      );

      expect(screen.getByText("项目1")).toBeInTheDocument();
      expect(screen.getByText("项目2")).toBeInTheDocument();
    });

    it("应该在没有 label 时显示 id", () => {
      render(
        <DndList data={{ id: "list-1" }} items={[]} onItemsChange={vi.fn()} />,
      );

      expect(screen.getByText("list-1")).toBeInTheDocument();
    });
  });

  describe("看板模式", () => {
    it("应该在看板中正确渲染", () => {
      render(
        <BoardWrapper>
          <DndList
            data={{ id: "list-1", label: "看板列表" }}
            items={[]}
            index={0}
          />
        </BoardWrapper>,
      );

      expect(screen.getByText("看板列表")).toBeInTheDocument();
    });
  });

  describe("自定义渲染", () => {
    it("应该支持自定义 renderHeader", () => {
      render(
        <DndList
          data={{ id: "list-1" }}
          items={[]}
          onItemsChange={vi.fn()}
          renderHeader={() => <div>自定义头部</div>}
        />,
      );

      expect(screen.getByText("自定义头部")).toBeInTheDocument();
    });

    it("应该支持隐藏 header", () => {
      render(
        <DndList
          data={{ id: "list-1", label: "列表标题" }}
          items={[]}
          onItemsChange={vi.fn()}
          renderHeader={false}
        />,
      );

      expect(screen.queryByText("列表标题")).not.toBeInTheDocument();
    });

    it("应该支持自定义 renderItem", () => {
      render(
        <DndList
          data={{ id: "list-1" }}
          items={[{ id: "item-1" }]}
          onItemsChange={vi.fn()}
          renderItem={(item) => <div>自定义项目: {item.id}</div>}
        />,
      );

      expect(screen.getByText("自定义项目: item-1")).toBeInTheDocument();
    });
  });

  describe("布局", () => {
    it("应该默认使用纵向布局", () => {
      const { container } = render(
        <DndList data={{ id: "list-1" }} items={[]} onItemsChange={vi.fn()} />,
      );

      expect(container.querySelector(".rdb\\:flex-col")).toBeInTheDocument();
    });

    it("应该支持横向布局", () => {
      const { container } = render(
        <DndList
          data={{ id: "list-1" }}
          items={[]}
          onItemsChange={vi.fn()}
          horizontal
        />,
      );

      expect(container.querySelector(".rdb\\:flex-row")).toBeInTheDocument();
    });
  });

  describe("拖拽控制", () => {
    it("应该支持布尔值禁用拖拽", () => {
      render(
        <BoardWrapper>
          <DndList
            data={{ id: "list-1", label: "列表" }}
            items={[]}
            index={0}
            isDragDisabled={true}
          />
        </BoardWrapper>,
      );

      expect(screen.getByText("列表")).toBeInTheDocument();
    });

    it("应该支持函数式禁用拖拽", () => {
      render(
        <BoardWrapper>
          <DndList
            data={{ id: "list-1", label: "列表" }}
            items={[]}
            index={0}
            isDragDisabled={(data) => data.id === "list-1"}
          />
        </BoardWrapper>,
      );

      expect(screen.getByText("列表")).toBeInTheDocument();
    });
  });

  describe("itemProps", () => {
    it("应该支持对象形式的 itemProps", () => {
      render(
        <DndList
          data={{ id: "list-1" }}
          items={[{ id: "item-1", label: "项目" }]}
          onItemsChange={vi.fn()}
          itemProps={{ className: "custom-item" }}
        />,
      );

      expect(document.querySelector(".custom-item")).toBeInTheDocument();
    });

    it("应该支持函数形式的 itemProps", () => {
      render(
        <DndList
          data={{ id: "list-1" }}
          items={[
            { id: "item-1", label: "项目1" },
            { id: "item-2", label: "项目2" },
          ]}
          onItemsChange={vi.fn()}
          itemProps={(_item, index) => ({
            className: `item-${index}`,
          })}
        />,
      );

      expect(document.querySelector(".item-0")).toBeInTheDocument();
      expect(document.querySelector(".item-1")).toBeInTheDocument();
    });
  });

  describe("样式", () => {
    it("应该应用 className", () => {
      const { container } = render(
        <DndList
          data={{ id: "list-1" }}
          items={[]}
          onItemsChange={vi.fn()}
          className="custom-list"
        />,
      );

      expect(container.querySelector(".custom-list")).toBeInTheDocument();
    });

    it("应该支持函数式 className", () => {
      const { container } = render(
        <DndList
          data={{ id: "list-1" }}
          items={[]}
          onItemsChange={vi.fn()}
          className={(isDraggingOver) =>
            isDraggingOver ? "dragging" : "not-dragging"
          }
        />,
      );

      expect(container.querySelector(".not-dragging")).toBeInTheDocument();
    });
  });
});
