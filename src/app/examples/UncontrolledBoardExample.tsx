import { DndBoard } from "@/lib/components/dnd-board";
import { ExampleSection } from "../components/ExampleSection";
import { basicBoardData } from "../data/mockData";

export function UncontrolledBoardExample() {
  return (
    <ExampleSection
      title="2. 非受控模式 - DndBoard"
      description="组件内部管理状态，通过 initialLists 提供初始数据"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-green-50 rdb:p-4 rdb:text-sm rdb:text-green-800">
          <strong>特点：</strong>组件自己管理状态，适合简单场景，无需父组件干预
        </div>

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
