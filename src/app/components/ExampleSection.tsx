import type { ReactNode } from "react";

interface ExampleSectionProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  variant?: "default" | "error";
}

export function ExampleSection({
  title,
  description,
  children,
  variant = "default",
}: ExampleSectionProps) {
  const headerClasses =
    variant === "error"
      ? "rdb:rounded-lg rdb:border-2 rdb:border-red-200 rdb:bg-red-50 rdb:p-6"
      : "rdb:rounded-lg rdb:bg-white rdb:p-6 rdb:shadow-md";

  const titleClasses =
    variant === "error"
      ? "rdb:mb-2 rdb:text-2xl rdb:font-semibold rdb:text-red-800"
      : "rdb:mb-2 rdb:text-2xl rdb:font-semibold rdb:text-slate-800";

  const descriptionClasses =
    variant === "error"
      ? "rdb:mb-4 rdb:text-red-700"
      : "rdb:mb-4 rdb:text-slate-600";

  return (
    <section className="rdb:space-y-4">
      <div className={headerClasses}>
        <h2 className={titleClasses}>{title}</h2>
        <p className={descriptionClasses}>{description}</p>
      </div>
      {children}
    </section>
  );
}
