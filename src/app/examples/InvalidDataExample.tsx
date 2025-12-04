import { DndList } from "@/lib/components/dnd-list";
import { useState } from "react";
import { ExampleSection } from "../components/ExampleSection";
import { invalidListData } from "../data/mockData";

export function InvalidDataExample() {
  const [list, setList] = useState(invalidListData);

  return (
    <ExampleSection
      title="8. 错误处理 - 无效数据"
      description="组件会自动验证和过滤无效数据（如空 ID），并显示错误信息"
      variant="error"
    >
      <div className="rdb:space-y-4">
        <div className="rdb:rounded rdb:bg-red-100 rdb:p-4 rdb:text-sm rdb:text-red-800">
          <strong>特点：</strong>
          内置数据验证，自动过滤无效项目，保证组件稳定运行
        </div>

        <div className="rdb:mx-auto rdb:max-w-2xl">
          <DndList
            list={list}
            onListChange={setList}
            renderHeader={(list) => (
              <div className="rdb:mb-3 rdb:border-b rdb:border-slate-200 rdb:pb-2">
                <h3 className="rdb:text-lg rdb:font-semibold rdb:text-slate-800">
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
