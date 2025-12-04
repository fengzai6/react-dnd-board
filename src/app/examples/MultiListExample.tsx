import { DndBoard } from "@/lib/components/dnd-board";
import { ExampleSection } from "../components/ExampleSection";
import { multiListBoardData } from "../data/mockData";

export function MultiListExample() {
  return (
    <ExampleSection
      title="10. 多列表拖拽"
      description="展示多个列表之间的拖拽交互，包括列表重排序和跨列表移动项目"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-teal-50 rdb:p-4 rdb:text-sm rdb:text-teal-800">
          <strong>特点：</strong>
          支持列表之间的拖拽重排序，项目可以在任意列表间移动
        </div>

        <DndBoard
          initialLists={multiListBoardData}
          renderListHeader={(list) => (
            <div
              className="rdb:mb-3 rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white"
              style={{ backgroundColor: list.color }}
            >
              <div className="rdb:flex rdb:items-center rdb:justify-between">
                <span>{list.title}</span>
                <span className="rdb:rounded rdb:bg-white/20 rdb:px-2 rdb:py-1 rdb:text-sm">
                  {list.items?.length || 0}
                </span>
              </div>
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
