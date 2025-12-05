import { DndBoard } from "@/lib/components/dnd-board";
import { ExampleSection } from "../../components/example-section";
import { basicBoardData } from "../../data/mock-data";

const CODE = `import { DndBoard } from "@/lib/components/dnd-board";

export function UncontrolledBoardExample() {
  return (
    <DndBoard
      initialLists={basicBoardData}
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

export function UncontrolledBoardExample() {
  return (
    <ExampleSection
      title="非受控模式 - DndBoard"
      description="组件内部管理状态，通过 initialLists 提供初始数据"
      codePath="examples/uncontrolled-board-example"
      code={CODE}
    >
      <div className="rdb:space-y-4">
        <DndBoard
          initialLists={basicBoardData}
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
