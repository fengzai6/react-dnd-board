import { DndList } from "@/lib/components/dnd-list";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";
import { basicListData } from "../../../data/mock-data";

const CODE = `import { DndList } from "@/lib";
import { useState } from "react";

const [items, setItems] = useState(basicListData.items);

<DndList
  data={basicListData}
  items={items}
  onItemsChange={setItems}
  horizontal
  renderHeader={false}
  classNames={{ content: "items-center" }}
  itemProps={{ className: "mr-2" }}
  renderItem={(item) => (
    <div>{item.text}</div>
  )}
/>`;

export function HorizontalListExample() {
  const [items, setItems] = useState(basicListData.items);

  return (
    <ExampleSection
      title="水平列表 (horizontal=true)"
      description="列表支持水平布局方向"
      code={CODE}
      codePath="examples/basic-example/horizontal-list-example"
    >
      <DndList
        data={basicListData}
        items={items}
        onItemsChange={setItems}
        horizontal
        renderHeader={false}
        classNames={{ content: "rdb:items-center" }}
        itemProps={{ className: "rdb:mr-2" }}
        renderItem={(item) => (
          <div className="rdb:text-sm rdb:whitespace-nowrap rdb:text-slate-700">
            {item.text}
          </div>
        )}
      />
    </ExampleSection>
  );
}
