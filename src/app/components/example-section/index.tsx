import type { ReactNode } from "react";
import { useState } from "react";

interface ExampleSectionProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  variant?: "default" | "error";
  code?: string;
  codePath?: string;
}

export function ExampleSection({
  title,
  description,
  children,
  variant = "default",
  code,
  codePath,
}: ExampleSectionProps) {
  const [showCode, setShowCode] = useState(false);

  const headerClasses =
    variant === "error"
      ? "rdb:rounded-lg rdb:border-2 rdb:border-red-200 rdb:bg-red-50 rdb:p-4"
      : "rdb:rounded-lg rdb:bg-white rdb:p-4 rdb:shadow-sm";

  const titleClasses =
    variant === "error"
      ? "rdb:mb-1 rdb:text-base rdb:font-semibold rdb:text-red-800"
      : "rdb:mb-1 rdb:text-base rdb:font-semibold rdb:text-slate-800";

  const descriptionClasses =
    variant === "error"
      ? "rdb:text-sm rdb:text-red-700"
      : "rdb:text-sm rdb:text-slate-600";

  return (
    <section className="rdb:space-y-3">
      <div className={headerClasses}>
        <div className="rdb:flex rdb:items-start rdb:justify-between rdb:gap-4">
          <div className="rdb:flex-1">
            <h3 className={titleClasses}>{title}</h3>
            <p className={descriptionClasses}>{description}</p>
          </div>
          <div className="rdb:flex rdb:shrink-0 rdb:items-center rdb:gap-2">
            {codePath && (
              <code className="rdb:rounded rdb:bg-slate-100 rdb:px-2 rdb:py-1 rdb:text-xs rdb:text-slate-600">
                {codePath}
              </code>
            )}
            {code && (
              <button
                onClick={() => setShowCode(!showCode)}
                className="hover:rdb:bg-slate-800 active:rdb:bg-slate-900 rdb:rounded rdb:bg-slate-700 rdb:px-3 rdb:py-1 rdb:text-xs rdb:font-medium rdb:text-white"
              >
                {showCode ? "隐藏代码" : "显示代码"}
              </button>
            )}
          </div>
        </div>
      </div>
      {children}
      {code && showCode && (
        <div className="rdb:rounded-lg rdb:border rdb:border-slate-200 rdb:bg-slate-900 rdb:p-4 rdb:shadow-sm">
          <pre className="rdb:overflow-x-auto rdb:text-xs rdb:text-slate-100">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
