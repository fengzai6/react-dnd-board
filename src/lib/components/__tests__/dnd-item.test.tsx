import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DndItem } from "../dnd-item";

// 包装组件，提供必要的 DnD 上下文
const DndWrapper = ({ children }: { children: React.ReactNode }) => (
  <DragDropContext onDragEnd={vi.fn()}>
    <Droppable droppableId="test-droppable">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

describe("DndItem 组件", () => {
  describe("基础渲染", () => {
    it("应该正确渲染子元素", () => {
      render(
        <DndWrapper>
          <DndItem data={{ id: "item-1" }} index={0}>
            <span>测试内容</span>
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByText("测试内容")).toBeInTheDocument();
    });

    it("应该支持函数式 children", () => {
      render(
        <DndWrapper>
          <DndItem data={{ id: "item-1" }} index={0}>
            {(isDragging) => <span>{isDragging ? "拖拽中" : "未拖拽"}</span>}
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByText("未拖拽")).toBeInTheDocument();
    });

    it("应该使用 label 作为 aria-label", () => {
      render(
        <DndWrapper>
          <DndItem data={{ id: "item-1", label: "自定义标签" }} index={0}>
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByLabelText("自定义标签")).toBeInTheDocument();
    });

    it("应该在没有 label 时使用默认 aria-label", () => {
      render(
        <DndWrapper>
          <DndItem data={{ id: "item-1" }} index={0}>
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByLabelText("Draggable Item")).toBeInTheDocument();
    });
  });

  describe("拖拽禁用", () => {
    it("应该支持布尔值禁用拖拽", () => {
      render(
        <DndWrapper>
          <DndItem data={{ id: "item-1" }} index={0} isDragDisabled={true}>
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByLabelText("Draggable Item")).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("应该支持函数式禁用拖拽", () => {
      render(
        <DndWrapper>
          <DndItem
            data={{ id: "item-1" }}
            index={0}
            isDragDisabled={(item) => item.id === "item-1"}
          >
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByLabelText("Draggable Item")).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("应该在未禁用时设置 aria-disabled 为 false", () => {
      render(
        <DndWrapper>
          <DndItem data={{ id: "item-1" }} index={0} isDragDisabled={false}>
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByLabelText("Draggable Item")).toHaveAttribute(
        "aria-disabled",
        "false",
      );
    });
  });

  describe("样式", () => {
    it("应该应用自定义 className", () => {
      const { container } = render(
        <DndWrapper>
          <DndItem data={{ id: "item-1" }} index={0} className="custom-class">
            内容
          </DndItem>
        </DndWrapper>,
      );

      // className 应用在内部 div 上
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("应该支持函数式 className", () => {
      const { container } = render(
        <DndWrapper>
          <DndItem
            data={{ id: "item-1" }}
            index={0}
            className={(isDragging) =>
              isDragging ? "dragging" : "not-dragging"
            }
          >
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(container.querySelector(".not-dragging")).toBeInTheDocument();
    });

    it("应该应用 rootClassName", () => {
      const { container } = render(
        <DndWrapper>
          <DndItem
            data={{ id: "item-1" }}
            index={0}
            rootClassName="custom-root"
          >
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(container.querySelector(".custom-root")).toBeInTheDocument();
    });
  });

  describe("数据类型", () => {
    it("应该支持 string 类型的 id", () => {
      render(
        <DndWrapper>
          <DndItem data={{ id: "string-id" }} index={0}>
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByText("内容")).toBeInTheDocument();
    });

    it("应该支持 number 类型的 id", () => {
      render(
        <DndWrapper>
          <DndItem data={{ id: 123 }} index={0}>
            内容
          </DndItem>
        </DndWrapper>,
      );

      expect(screen.getByText("内容")).toBeInTheDocument();
    });
  });
});
