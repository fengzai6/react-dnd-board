import { DndBoard } from "@/lib/components/dnd-board";
import type { BoardList } from "@/lib/types";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";

interface ListData {
  id: string;
  title: string;
  color: string;
}

interface ItemData {
  id: string;
  content: string;
}

const CODE = `import { DndBoard } from "@/lib";
import { useState } from "react";

const [lists, setLists] = useState([
  { id: "empty-1", title: "空列表 1", color: "#6b7280", items: [] },
  { id: "empty-2", title: "空列表 2", color: "#3b82f6", items: [] },
  {
    id: "with-items",
    title: "有项目的列表",
    color: "#10b981",
    items: [
      { id: "item-1", content: "可以拖到空列表" },
      { id: "item-2", content: "试试拖拽我" },
    ],
  },
]);

<DndBoard lists={lists} onListsChange={setLists} />`;

export function EmptyList() {
  const [lists, setLists] = useState<BoardList<ListData, ItemData>[]>([
    { id: "empty-1", title: "空列表 1", color: "#6b7280", items: [] },
    { id: "empty-2", title: "空列表 2", color: "#3b82f6", items: [] },
    {
      id: "with-items",
      title: "有项目的列表",
      color: "#10b981",
      items: [
        { id: "item-1", content: "可以拖到空列表" },
        { id: "item-2", content: "试试拖拽我" },
      ],
    },
  ]);

  return (
    <ExampleSection
      title="空列表处理"
      description="空列表可作为拖放目标，支持从其他列表拖入项目"
      codePath="examples/edge-cases-example/empty-list"
      code={CODE}
    >
      <DndBoard
        lists={lists}
        onListsChange={setLists}
        listProps={(list) => ({
          renderHeader: (dragHandleProps) => (
            <div
              {...dragHandleProps}
              className="rdb:flex rdb:items-center rdb:justify-between rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white"
              style={{ backgroundColor: list.color }}
            >
              <span>{list.title}</span>
              <span className="rdb:rounded rdb:bg-white/20 rdb:px-2 rdb:py-1 rdb:text-sm">
                {list.items?.length || 0}
              </span>
            </div>
          ),
          renderItem: (item) => (
            <div className="rdb:text-sm rdb:text-slate-700">{item.content}</div>
          ),
        })}
      />
    </ExampleSection>
  );
}
