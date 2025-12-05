import { DndList } from "@/lib/components/dnd-list";
import { ExampleSection } from "../../components/example-section";
import { basicListData } from "../../data/mock-data";

const CODE = `import { DndList } from "@/lib/components/dnd-list";

export function UncontrolledListExample() {
  return (
    <DndList
      initialList={basicListData}
      renderHeader={(list) => (
        <div>
          <h3>{list.name}</h3>
        </div>
      )}
      renderItem={(item) => (
        <div>{item.text}</div>
      )}
    />
  );
}`;

export function UncontrolledListExample() {
  return (
    <ExampleSection
      title="非受控模式 - DndList"
      description="组件内部管理状态，适合简单的列表拖拽场景"
      codePath="examples/uncontrolled-list-example"
      code={CODE}
    >
      <div className="rdb:space-y-4">
        <div className="rdb:mx-auto rdb:max-w-2xl">
          <DndList
            initialList={basicListData}
            renderHeader={(list) => (
              <div className="rdb:mb-3 rdb:border-b rdb:border-slate-200 rdb:pb-2">
                <h3 className="rdb:text-base rdb:font-semibold rdb:text-slate-800">
                  {list.name}
                </h3>
              </div>
            )}
            renderItem={(item) => (
              <div className="rdb:text-slate-700">{item.text}</div>
            )}
          />
        </div>
      </div>
    </ExampleSection>
  );
}
