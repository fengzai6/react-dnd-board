import { DndBoard } from "@/lib/components/dnd-board";
import { ExampleSection } from "../components/ExampleSection";
import { largeDataBoard } from "../data/mockData";
import { getPriorityColor, getPriorityLabel } from "../data/utils";

export function LargeDataExample() {
  return (
    <ExampleSection
      title="9. 大数据量性能测试"
      description="测试组件在处理大量数据时的性能表现（50 个项目）"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-indigo-50 rdb:p-4 rdb:text-sm rdb:text-indigo-800">
          <strong>特点：</strong>使用 React Compiler
          自动优化，支持大量数据的流畅拖拽
        </div>

        <DndBoard
          initialLists={largeDataBoard}
          renderListHeader={(list) => (
            <div
              className="rdb:mb-3 rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white"
              style={{ backgroundColor: list.color }}
            >
              <div className="rdb:flex rdb:items-center rdb:justify-between">
                <span>{list.title}</span>
                <span className="rdb:rounded rdb:bg-white/20 rdb:px-2 rdb:py-1 rdb:text-sm">
                  {list.items?.length || 0} 项
                </span>
              </div>
            </div>
          )}
          renderItem={(item) => (
            <div className="rdb:flex rdb:items-center rdb:justify-between rdb:gap-2">
              <span className="rdb:flex-1 rdb:text-sm rdb:text-slate-700">
                {item.content}
              </span>
              <span
                className={`rdb:rounded rdb:px-2 rdb:py-1 rdb:text-xs ${getPriorityColor(item.priority)}`}
              >
                {getPriorityLabel(item.priority)}
              </span>
            </div>
          )}
        />
      </div>
    </ExampleSection>
  );
}
