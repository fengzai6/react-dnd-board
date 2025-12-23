import { DndList } from "@/lib/components/dnd-list";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";
import { basicListData } from "../../../data/mock-data";

const CODE = `import { DndList } from "@/lib";
import { useState } from "react";

const [items, setItems] = useState(basicListData.items);

const handleToggle = (id: string | number) => {
  setItems((prev) =>
    prev?.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    ),
  );
};

<DndList
  data={basicListData}
  items={items}
  onItemsChange={setItems}
  renderHeader={() => (
    <div>
      <h3>{basicListData.name}</h3>
      <p>{basicListData.description}</p>
    </div>
  )}
  renderItem={(item, _index, isDragging) => (
    <div className={isDragging ? "opacity-80" : ""}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => handleToggle(item.id)}
      />
      <span className={item.completed ? "line-through" : ""}>
        {item.text}
      </span>
    </div>
  )}
/>`;

export function ListExample() {
  const [items, setItems] = useState(basicListData.items);

  const handleToggle = (id: string | number) => {
    setItems((prev) =>
      prev?.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return (
    <ExampleSection
      title="垂直列表 (DndList)"
      description="单独使用 DndList 组件，支持项目拖拽排序"
      code={CODE}
      codePath="examples/basic-example/list-example"
    >
      <div className="rdb:max-w-md">
        <DndList
          data={basicListData}
          items={items}
          onItemsChange={setItems}
          renderHeader={() => (
            <div className="rdb:space-y-1 rdb:border-b rdb:border-slate-200 rdb:p-4">
              <h3 className="rdb:text-lg rdb:font-semibold rdb:text-slate-800">
                {basicListData.name}
              </h3>
              <p className="rdb:text-sm rdb:text-slate-500">
                {basicListData.description}
              </p>
            </div>
          )}
          renderItem={(item, _index, isDragging) => (
            <div
              className={`rdb:flex rdb:items-center rdb:gap-3 ${isDragging ? "rdb:opacity-80" : ""}`}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggle(item.id)}
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
          itemProps={{ className: "rdb:mb-2" }}
        />
      </div>
    </ExampleSection>
  );
}
