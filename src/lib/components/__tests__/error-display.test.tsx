import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ErrorDisplay } from "../error-display";

describe("ErrorDisplay 组件", () => {
  it("应该显示默认标题", () => {
    render(<ErrorDisplay error="测试错误" />);

    expect(screen.getByText("数据验证错误")).toBeInTheDocument();
  });

  it("应该显示自定义标题", () => {
    render(<ErrorDisplay error="测试错误" title="自定义" />);

    expect(screen.getByText("自定义错误")).toBeInTheDocument();
  });

  it("应该显示错误信息", () => {
    render(<ErrorDisplay error="ID 不能为空" />);

    expect(screen.getByText("ID 不能为空")).toBeInTheDocument();
  });

  it("应该应用自定义 className", () => {
    const { container } = render(
      <ErrorDisplay error="错误" className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("应该渲染错误图标", () => {
    const { container } = render(<ErrorDisplay error="错误" />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("应该有正确的样式类", () => {
    const { container } = render(<ErrorDisplay error="错误" />);

    expect(container.firstChild).toHaveClass("rdb:bg-red-50");
    expect(container.firstChild).toHaveClass("rdb:border-red-300");
  });
});
