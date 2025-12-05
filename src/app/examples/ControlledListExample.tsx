import { DndList } from "@/lib/components/dnd-list";
import { useState } from "react";
import { ExampleSection } from "../components/ExampleSection";
import { basicListData } from "../data/mockData";

export function ControlledListExample() {
  const [list, setList] = useState(basicListData);

  return (
    <ExampleSection
      title="3. 受控模式 - DndList"
      description="单个列表的受控模式，父组件管理列表状态"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-purple-50 rdb:p-4 rdb:text-sm rdb:text-purple-800">
          <strong>特点：</strong>适合需要监听列表变化或执行额外逻辑的场景
        </div>

        <div className="rdb:mx-auto rdb:max-w-2xl">
          <DndList
            list={list}
            onListChange={setList}
            renderHeader={(list) => (
              <div className="rdb:mb-3 rdb:space-y-1 rdb:border-b rdb:border-slate-200 rdb:pb-3">
                <h3 className="rdb:text-lg rdb:font-semibold rdb:text-slate-800">
                  {list.name}
                </h3>
                <p className="rdb:text-sm rdb:text-slate-500">
                  {list.description}
                </p>
              </div>
            )}
            renderItem={(item) => (
              <div className="rdb:flex rdb:items-center rdb:gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {
                    const newItems = list.items?.map((i) =>
                      i.id === item.id ? { ...i, completed: !i.completed } : i
                    );
                    setList({ ...list, items: newItems });
                  }}
                  className="rdb:h-4 rdb:w-4 rdb:cursor-pointer"
                />
                <span
                  className={`rdb:flex-1 ${
                    item.completed
                      ? "rdb:text-slate-400 rdb:line-through"
                      : "rdb:text-slate-800"
                  }`}
                >
                  {item.text}
                </span>
              </div>
            )}
          />
        </div>
      </div>
    </ExampleSection>
  );
}
