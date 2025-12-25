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
  className="rounded-xl border-2 border-emerald-200 bg-emerald-50"
  renderHeader={() => (
    <div className="bg-emerald-500 text-white">
      <h3>✨ {basicListData.name}</h3>
      <p>{basicListData.description}</p>
    </div>
  )}
  renderItem={(item, _index, isDragging) => (
    <div className={isDragging ? "ring-2 ring-emerald-400" : ""}>
      <span className={item.completed ? "bg-emerald-500" : "bg-slate-300"} />
      <span className={item.completed ? "line-through" : ""}>
        {item.text}
      </span>
    </div>
  )}
/>`;

export function ListCustomRender() {
  const [items, setItems] = useState(basicListData.items);

  return (
    <ExampleSection
      title="自定义列表样式"
      description="通过 renderHeader 和 renderItem 完全自定义列表外观"
      codePath="examples/custom-render-example/list-custom-render"
      code={CODE}
    >
      <div className="rdb:max-w-md">
        <DndList
          data={basicListData}
          items={items}
          onItemsChange={setItems}
          className="rdb:rounded-xl rdb:border-2 rdb:border-emerald-200 rdb:bg-emerald-50"
          renderHeader={() => (
            <div className="rdb:border-b rdb:border-emerald-200 rdb:bg-emerald-500 rdb:p-4 rdb:text-white">
              <h3 className="rdb:text-lg rdb:font-bold">
                ✨ {basicListData.name}
              </h3>
              <p className="rdb:text-sm rdb:text-emerald-100">
                {basicListData.description}
              </p>
            </div>
          )}
          renderItem={(item, _index, isDragging) => (
            <div
              className={`rdb:flex rdb:items-center rdb:gap-3 rdb:rounded-lg rdb:bg-white rdb:p-3 rdb:shadow-sm ${
                isDragging ? "rdb:ring-2 rdb:ring-emerald-400" : ""
              }`}
            >
              <span
                className={`rdb:h-3 rdb:w-3 rdb:rounded-full ${
                  item.completed ? "rdb:bg-emerald-500" : "rdb:bg-slate-300"
                }`}
              />
              <span
                className={`rdb:flex-1 ${
                  item.completed
                    ? "rdb:text-slate-400 rdb:line-through"
                    : "rdb:text-slate-700"
                }`}
              >
                {item.text}
              </span>
            </div>
          )}
          itemProps={{ className: "rdb:mb-2 rdb:px-2" }}
        />
      </div>
    </ExampleSection>
  );
}
