import { DndBoard } from "@/lib/components/dnd-board";
import { DndList } from "@/lib/components/dnd-list";
import type { BoardList } from "@/lib/types";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";

interface ListData {
  id: string;
  name: string;
}

interface ItemData {
  id: string;
  text: string;
}

const CODE = `import { DndBoard, DndList } from "@/lib";
import { useState } from "react";

// 包含重复 ID 的数据 - 会显示错误
const invalidLists = [
  {
    id: "list-1",
    name: "列表 1",
    items: [
      { id: "item-1", text: "项目 1" },
      { id: "item-1", text: "重复 ID 的项目" }, // 重复 ID
    ],
  },
];

// 包含空 ID 的数据 - 会显示错误
const invalidItems = [
  { id: "item-1", text: "正常项目" },
  { id: "", text: "空 ID 的项目" }, // 空 ID
];

<DndBoard lists={invalidLists} onListsChange={setLists} />
<DndList data={listData} items={invalidItems} onItemsChange={setItems} />`;

export function InvalidData() {
  // 包含重复 ID 的看板数据
  const [duplicateIdLists, setDuplicateIdLists] = useState<
    BoardList<ListData, ItemData>[]
  >([
    {
      id: "list-1",
      name: "列表 1",
      items: [
        { id: "item-1", text: "项目 1" },
        { id: "item-1", text: "重复 ID 的项目" },
      ],
    },
  ]);

  // 包含空 ID 的列表数据
  const [emptyIdItems, setEmptyIdItems] = useState<ItemData[]>([
    { id: "item-1", text: "正常项目 1" },
    { id: "", text: "空 ID 的项目" },
    { id: "item-2", text: "正常项目 2" },
  ]);

  return (
    <ExampleSection
      title="错误处理 - 无效数据"
      description="组件会自动验证数据，当发现重复 ID 或空 ID 时会显示错误信息"
      variant="error"
      codePath="examples/edge-cases-example/invalid-data"
      code={CODE}
    >
      <div className="md:rdb:grid-cols-2 rdb:grid rdb:gap-6">
        <div className="rdb:space-y-2">
          <p className="rdb:text-xs rdb:text-red-600">
            重复 ID 错误 (DndBoard)
          </p>
          <DndBoard
            lists={duplicateIdLists}
            onListsChange={setDuplicateIdLists}
          />
        </div>
        <div className="rdb:space-y-2">
          <p className="rdb:text-xs rdb:text-red-600">空 ID 错误 (DndList)</p>
          <DndList
            data={{ id: "invalid-list", label: "包含无效项的列表" }}
            items={emptyIdItems}
            onItemsChange={setEmptyIdItems}
          />
        </div>
      </div>
    </ExampleSection>
  );
}
