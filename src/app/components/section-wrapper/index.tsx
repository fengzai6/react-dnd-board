import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function SectionWrapper({ id, title, children }: SectionWrapperProps) {
  return (
    <section className="rdb:space-y-6">
      <h2
        id={`section-${id}`}
        className="rdb:text-lg rdb:font-semibold rdb:text-slate-700"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
