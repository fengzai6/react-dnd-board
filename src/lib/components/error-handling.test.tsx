import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DndBoard } from "./dnd-board";
import { DndList } from "./dnd-list";

describe("错误处理和优雅降级", () => {
  describe("DndBoard 错误处理", () => {
    it("应该在接收 null 时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndBoard lists={null} />);
      expect(screen.getByText(/DndBoard 错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Lists must be an array/i)).toBeInTheDocument();
    });

    it("应该在接收非数组时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndBoard lists={{ invalid: "data" }} />);
      expect(screen.getByText(/DndBoard 错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Lists must be an array/i)).toBeInTheDocument();
    });

    it("应该在列表项缺少 id 时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndBoard lists={[{ name: "List without id" }]} />);
      expect(screen.getByText(/DndBoard 错误/i)).toBeInTheDocument();
      expect(
        screen.getByText(/missing required field: id/i),
      ).toBeInTheDocument();
    });

    it("应该在列表项有重复 id 时显示错误信息", () => {
      render(
        <DndBoard
          lists={[
            { id: "1", items: [] },
            { id: "1", items: [] },
          ]}
        />,
      );
      expect(screen.getByText(/DndBoard 错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Duplicate list ID/i)).toBeInTheDocument();
    });

    it("应该在空列表时显示友好提示", () => {
      render(<DndBoard lists={[]} />);
      expect(screen.getByText(/暂无列表/i)).toBeInTheDocument();
      expect(
        screen.getByText(/开始添加列表来组织您的内容/i),
      ).toBeInTheDocument();
    });

    it("应该在有效数据时正常渲染", () => {
      render(
        <DndBoard
          lists={[
            { id: "1", items: [{ id: "item-1" }] },
            { id: "2", items: [] },
          ]}
        />,
      );
      expect(screen.queryByText(/DndBoard 错误/i)).not.toBeInTheDocument();
    });
  });

  describe("DndList 错误处理", () => {
    it("应该在 list 为 undefined 时显示错误信息", () => {
      render(<DndList />);
      expect(screen.getByText(/DndList 错误/i)).toBeInTheDocument();
      expect(screen.getByText(/List data is required/i)).toBeInTheDocument();
    });

    it("应该在 list 为 null 时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndList list={null} />);
      expect(screen.getByText(/DndList 错误/i)).toBeInTheDocument();
      expect(screen.getByText(/List data is required/i)).toBeInTheDocument();
    });

    it("应该在 list 缺少 id 时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndList list={{ name: "List without id" }} />);
      expect(screen.getByText(/DndList 错误/i)).toBeInTheDocument();
      expect(
        screen.getByText(/missing required field: id/i),
      ).toBeInTheDocument();
    });

    it("应该在独立列表模式下正常渲染", () => {
      render(<DndList list={{ id: "1" }} />);
      expect(screen.queryByText(/DndList 错误/i)).not.toBeInTheDocument();
    });

    it("应该在有效数据时正常渲染", () => {
      render(<DndList list={{ id: "1", items: [] }} />);
      expect(screen.queryByText(/DndList 错误/i)).not.toBeInTheDocument();
    });

    it("应该在 items 为 undefined 时使用空数组", () => {
      render(<DndList list={{ id: "1" }} />);
      expect(screen.queryByText(/DndList 错误/i)).not.toBeInTheDocument();
    });
  });
});
