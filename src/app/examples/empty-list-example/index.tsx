import { DndBoard } from "@/lib/components/dnd-board";
import { ExampleSection } from "../../components/example-section";
import { emptyBoardData } from "../../data/mock-data";

const CODE = `import { DndBoard } from "@/lib/components/dnd-board";

export function EmptyListExample() {
  return (
    <DndBoard
      initialLists={emptyBoardData}
      renderListHeader={(list) => (
        <div style={{ backgroundColor: list.color }}>
          {list.title}
        </div>
      )}
      renderItem={(item) => (
        <div>{item.content}</div>
      )}
    />
  );
}`;

export function EmptyListExample() {
  return (
    <ExampleSection
      title="空列表处理"
      description="展示组件如何优雅地处理空列表的情况"
      codePath="examples/empty-list-example"
      code={CODE}
    >
      <div className="rdb:space-y-4">
        <DndBoard
          initialLists={emptyBoardData}
          renderListHeader={(list) => (
            <div
              className="rdb:mb-3 rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white"
              style={{ backgroundColor: list.color }}
            >
              {list.title}
            </div>
          )}
          renderItem={(item) => (
            <div className="rdb:text-sm rdb:text-slate-700">{item.content}</div>
          )}
        />
      </div>
    </ExampleSection>
  );
}
