import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DndBoard } from "../dnd-board";
import { DndList } from "../dnd-list";

describe("错误处理和优雅降级", () => {
  describe("DndBoard 错误处理", () => {
    it("应该在接收 null 时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndBoard lists={null} onListsChange={() => {}} />);
      expect(screen.getByText(/数据验证错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Lists cannot be empty/i)).toBeInTheDocument();
    });

    it("应该在接收非数组时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndBoard lists={{ invalid: "data" }} onListsChange={() => {}} />);
      expect(screen.getByText(/数据验证错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Lists must be an array/i)).toBeInTheDocument();
    });

    it("应该在列表项缺少 id 时显示错误信息", () => {
      render(
        <DndBoard
          // @ts-expect-error - 故意传入无效数据进行测试
          lists={[{ name: "List without id" }]}
          onListsChange={() => {}}
        />,
      );
      expect(screen.getByText(/数据验证错误/i)).toBeInTheDocument();
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
          onListsChange={() => {}}
        />,
      );
      expect(screen.getByText(/数据验证错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Duplicate list ID/i)).toBeInTheDocument();
    });

    it("应该在有效数据时正常渲染", () => {
      render(
        <DndBoard
          lists={[
            { id: "1", items: [{ id: "item-1" }] },
            { id: "2", items: [] },
          ]}
          onListsChange={() => {}}
        />,
      );
      expect(screen.queryByText(/数据验证错误/i)).not.toBeInTheDocument();
    });
  });

  describe("DndList 错误处理", () => {
    it("应该在 data 为 undefined 时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndList />);
      expect(screen.getByText(/数据验证错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Data cannot be empty/i)).toBeInTheDocument();
    });

    it("应该在 data 为 null 时显示错误信息", () => {
      // @ts-expect-error - 故意传入无效数据进行测试
      render(<DndList data={null} />);
      expect(screen.getByText(/数据验证错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Data cannot be empty/i)).toBeInTheDocument();
    });

    it("应该在 data 缺少 id 时显示错误信息", () => {
      render(
        <DndList
          // @ts-expect-error - 故意传入无效数据进行测试
          data={{ name: "List without id" }}
        />,
      );
      expect(screen.getByText(/数据验证错误/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Missing required field: id/i),
      ).toBeInTheDocument();
    });

    it("应该在 items 有重复 id 时显示错误信息", () => {
      render(
        <DndList
          data={{ id: "list-1" }}
          items={[{ id: "item-1" }, { id: "item-1" }]}
        />,
      );
      expect(screen.getByText(/数据验证错误/i)).toBeInTheDocument();
      expect(screen.getByText(/Duplicate item ID/i)).toBeInTheDocument();
    });

    it("应该在有效数据时正常渲染", () => {
      render(<DndList data={{ id: "1" }} items={[]} />);
      expect(screen.queryByText(/数据验证错误/i)).not.toBeInTheDocument();
    });

    it("应该在 items 为 undefined 时使用空数组", () => {
      render(<DndList data={{ id: "1" }} />);
      expect(screen.queryByText(/数据验证错误/i)).not.toBeInTheDocument();
    });
  });
});
