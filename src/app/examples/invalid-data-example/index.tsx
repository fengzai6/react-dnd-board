import { DndList } from "@/lib/components/dnd-list";
import { useState } from "react";
import { ExampleSection } from "../../components/example-section";
import { invalidListData } from "../../data/mock-data";

const CODE = `import { DndList } from "@/lib/components/dnd-list";
import { useState } from "react";

export function InvalidDataExample() {
  const [list, setList] = useState(invalidListData);

  return (
    <DndList
      list={list}
      onListChange={setList}
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

export function InvalidDataExample() {
  const [list, setList] = useState(invalidListData);

  return (
    <ExampleSection
      title="错误处理 - 无效数据"
      description="组件会自动验证和过滤无效数据（如空 ID），并显示错误信息"
      variant="error"
      codePath="examples/invalid-data-example"
      code={CODE}
    >
      <div className="rdb:space-y-4">
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
