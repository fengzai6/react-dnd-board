import { DndBoard } from "@/lib/components/dnd-board";
import { ExampleSection } from "../components/ExampleSection";
import { emptyBoardData } from "../data/mockData";

export function EmptyListExample() {
  return (
    <ExampleSection
      title="7. 空列表处理"
      description="展示组件如何优雅地处理空列表的情况"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-slate-50 rdb:p-4 rdb:text-sm rdb:text-slate-800">
          <strong>特点：</strong>空列表仍然可以作为拖拽目标，接收其他列表的项目
        </div>

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
