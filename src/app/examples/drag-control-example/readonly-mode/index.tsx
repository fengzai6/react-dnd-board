import { DndList } from "@/lib/components/dnd-list";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";
import { basicListData } from "../../../data/mock-data";

const CODE = `import { DndList } from "@/lib";
import { useState } from "react";

const [items, setItems] = useState(basicListData.items);

// 完全禁用拖拽（只读模式）
<DndList
  data={basicListData}
  items={items}
  onItemsChange={setItems}
  itemProps={{ isDragDisabled: true }}
/>`;

export function ReadonlyMode() {
  const [items, setItems] = useState(basicListData.items);

  return (
    <ExampleSection
      title="只读模式"
      description="完全禁用拖拽功能，适用于展示场景"
      codePath="examples/drag-control-example/readonly-mode"
      code={CODE}
    >
      <div className="rdb:max-w-md">
        <DndList
          data={basicListData}
          items={items}
          onItemsChange={setItems}
          itemProps={{ isDragDisabled: true }}
          renderHeader={() => (
            <div className="rdb:border-b rdb:border-slate-200 rdb:bg-slate-50 rdb:p-4">
              <h3 className="rdb:font-semibold rdb:text-slate-600">
                {basicListData.name} (只读)
              </h3>
            </div>
          )}
          renderItem={(item) => (
            <div className="rdb:text-sm rdb:text-slate-400">{item.text}</div>
          )}
        />
      </div>
    </ExampleSection>
  );
}
