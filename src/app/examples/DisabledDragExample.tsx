import { DndBoard } from "@/lib/components/dnd-board";
import { ExampleSection } from "../components/ExampleSection";
import { basicBoardData } from "../data/mockData";

export function DisabledDragExample() {
  return (
    <ExampleSection
      title="6. 禁用拖拽"
      description="通过 enableListDrag 和 enableItemDrag 控制拖拽功能的开关"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-gray-50 rdb:p-4 rdb:text-sm rdb:text-gray-800">
          <strong>特点：</strong>
          可以分别禁用列表拖拽和项目拖拽，适合只读展示场景
        </div>

        <div className="rdb:grid rdb:gap-6 rdb:md:grid-cols-2">
          {/* 禁用项目拖拽 */}
          <div className="rdb:space-y-2">
            <h4 className="rdb:font-semibold rdb:text-slate-700">
              禁用项目拖拽
            </h4>
            <DndBoard
              initialLists={basicBoardData.slice(0, 2)}
              enableItemDrag={false}
              renderListHeader={(list) => (
                <div
                  className="rdb:mb-3 rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white"
                  style={{ backgroundColor: list.color }}
                >
                  {list.title}
                </div>
              )}
              renderItem={(item) => (
                <div className="rdb:text-sm rdb:text-slate-700">
                  {item.content}
                </div>
              )}
            />
          </div>

          {/* 禁用列表拖拽 */}
          <div className="rdb:space-y-2">
            <h4 className="rdb:font-semibold rdb:text-slate-700">
              禁用列表拖拽
            </h4>
            <DndBoard
              initialLists={basicBoardData.slice(0, 2)}
              enableListDrag={false}
              renderListHeader={(list) => (
                <div
                  className="rdb:mb-3 rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white"
                  style={{ backgroundColor: list.color }}
                >
                  {list.title}
                </div>
              )}
              renderItem={(item) => (
                <div className="rdb:text-sm rdb:text-slate-700">
                  {item.content}
                </div>
              )}
            />
          </div>
        </div>

        {/* 完全禁用拖拽 */}
        <div className="rdb:space-y-2">
          <h4 className="rdb:font-semibold rdb:text-slate-700">完全禁用拖拽</h4>
          <DndBoard
            initialLists={basicBoardData.slice(0, 2)}
            enableListDrag={false}
            enableItemDrag={false}
            renderListHeader={(list) => (
              <div
                className="rdb:mb-3 rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white rdb:opacity-60"
                style={{ backgroundColor: list.color }}
              >
                {list.title} (只读)
              </div>
            )}
            renderItem={(item) => (
              <div className="rdb:text-sm rdb:text-slate-500">
                {item.content}
              </div>
            )}
          />
        </div>
      </div>
    </ExampleSection>
  );
}
