import { DndBoard } from "@/lib/components/dnd-board";
import { ExampleSection } from "../components/ExampleSection";
import { basicBoardData } from "../data/mockData";

export function CustomRenderExample() {
  return (
    <ExampleSection
      title="5. 自定义渲染"
      description="通过 renderListHeader 和 renderItem 完全自定义列表和项目的外观"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-pink-50 rdb:p-4 rdb:text-sm rdb:text-pink-800">
          <strong>特点：</strong>灵活的渲染函数，可以实现任意样式和交互
        </div>

        <DndBoard
          initialLists={basicBoardData}
          renderListHeader={(list) => (
            <div className="rdb:mb-3 rdb:space-y-2 rdb:rounded-t-lg rdb:bg-linear-to-r rdb:from-indigo-500 rdb:to-purple-500 rdb:p-4 rdb:text-white">
              <div className="rdb:flex rdb:items-center rdb:justify-between">
                <h3 className="rdb:text-lg rdb:font-bold">{list.title}</h3>
                <span className="rdb:rounded-full rdb:bg-white/30 rdb:px-3 rdb:py-1 rdb:text-xs rdb:font-semibold">
                  {list.items?.length || 0} 项
                </span>
              </div>
              <div className="rdb:h-1 rdb:w-full rdb:rounded-full rdb:bg-white/20" />
            </div>
          )}
          renderItem={(item) => (
            <div className="rdb:space-y-3 rdb:rounded-lg rdb:border-l-4 rdb:border-indigo-500 rdb:bg-linear-to-r rdb:from-slate-50 rdb:to-white rdb:p-3">
              <div className="rdb:flex rdb:items-start rdb:justify-between">
                <p className="rdb:flex-1 rdb:font-medium rdb:text-slate-800">
                  {item.content}
                </p>
                <span className="rdb:text-2xl">
                  {item.priority === "high"
                    ? "🔴"
                    : item.priority === "medium"
                      ? "🟡"
                      : "🟢"}
                </span>
              </div>
              <div className="rdb:flex rdb:gap-2">
                <span className="rdb:rounded-full rdb:bg-indigo-100 rdb:px-2 rdb:py-1 rdb:text-xs rdb:text-indigo-700">
                  优先级: {item.priority}
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </ExampleSection>
  );
}
