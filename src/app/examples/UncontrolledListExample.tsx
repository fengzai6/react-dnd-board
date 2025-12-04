import { DndList } from "@/lib/components/dnd-list";
import { ExampleSection } from "../components/ExampleSection";
import { basicListData } from "../data/mockData";

export function UncontrolledListExample() {
  return (
    <ExampleSection
      title="4. 非受控模式 - DndList"
      description="组件内部管理状态，适合简单的列表拖拽场景"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-amber-50 rdb:p-4 rdb:text-sm rdb:text-amber-800">
          <strong>特点：</strong>最简单的使用方式，无需状态管理
        </div>

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
