import { DndBoard } from "@/lib/components/dnd-board";
import type { BoardList } from "@/lib/types";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";

interface Task {
  id: string;
  title: string;
  locked?: boolean;
}

interface List {
  id: string;
  name: string;
  locked?: boolean;
}

const CODE = `import { DndBoard } from "@/lib";
import { useState } from "react";

const [lists, setLists] = useState([
  {
    id: "list-1",
    name: "可拖拽列表",
    locked: false,
    items: [
      { id: "task-1", title: "普通任务" },
      { id: "task-2", title: "锁定任务", locked: true },
    ],
  },
  {
    id: "list-2",
    name: "锁定列表",
    locked: true,
    items: [{ id: "task-3", title: "任务 3" }],
  },
]);

// 根据数据动态控制拖拽
<DndBoard
  lists={lists}
  onListsChange={setLists}
  listProps={(list) => ({
    isDragDisabled: list.locked,
    itemProps: (item) => ({
      isDragDisabled: item.locked,
    }),
  })}
/>`;

export function ConditionalDrag() {
  const [lists, setLists] = useState<BoardList<List, Task>[]>([
    {
      id: "list-1",
      name: "可拖拽列表",
      locked: false,
      items: [
        { id: "task-1", title: "普通任务 1" },
        { id: "task-2", title: "锁定任务", locked: true },
        { id: "task-3", title: "普通任务 2" },
      ],
    },
    {
      id: "list-2",
      name: "锁定列表",
      locked: true,
      items: [
        { id: "task-4", title: "任务 4" },
        { id: "task-5", title: "任务 5" },
      ],
    },
    {
      id: "list-3",
      name: "混合列表",
      locked: false,
      items: [
        { id: "task-6", title: "可拖拽任务" },
        { id: "task-7", title: "锁定任务", locked: true },
      ],
    },
  ]);

  return (
    <ExampleSection
      title="条件拖拽"
      description="根据数据动态控制拖拽行为，锁定的列表和任务无法拖拽"
      codePath="examples/drag-control-example/conditional-drag"
      code={CODE}
    >
      <DndBoard
        lists={lists}
        onListsChange={setLists}
        listProps={(list) => ({
          isDragDisabled: list.locked,
          itemProps: (item) => ({
            isDragDisabled: item.locked,
          }),
          renderHeader: (dragHandleProps) => (
            <div
              {...dragHandleProps}
              className={`rdb:flex rdb:items-center rdb:justify-between rdb:border-b rdb:border-slate-200 rdb:p-4 ${list.locked ? "rdb:bg-slate-100" : ""}`}
            >
              <span className="rdb:text-base rdb:font-semibold rdb:text-slate-800">
                {list.name}
              </span>
              {list.locked && (
                <span className="rdb:rounded rdb:bg-red-100 rdb:px-2 rdb:py-1 rdb:text-xs rdb:text-red-700">
                  🔒 锁定
                </span>
              )}
            </div>
          ),
          renderItem: (item) => (
            <div className="rdb:flex rdb:items-center rdb:justify-between">
              <span
                className={`rdb:text-sm ${item.locked ? "rdb:text-slate-400" : "rdb:text-slate-700"}`}
              >
                {item.title}
              </span>
              {item.locked && (
                <span className="rdb:text-xs rdb:text-red-600">🔒</span>
              )}
            </div>
          ),
        })}
      />
    </ExampleSection>
  );
}
