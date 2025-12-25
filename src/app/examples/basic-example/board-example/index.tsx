import { DndBoard } from "@/lib/components/dnd-board";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";
import { basicBoardData } from "../../../data/mock-data";
import { getPriorityColor, getPriorityLabel } from "../../../data/utils";

const CODE = `import { DndBoard } from "@/lib";
import { useState } from "react";

const [lists, setLists] = useState(basicBoardData);

<DndBoard
  lists={lists}
  onListsChange={setLists}
  listProps={(list) => ({
    style: { backgroundColor: list.color + "10" },
    renderHeader: (dragHandleProps) => (
      <div {...dragHandleProps} style={{ backgroundColor: list.color }}>
        <span>{list.title}</span>
        <span>{list.items?.length || 0}</span>
      </div>
    ),
    renderItem: (item) => (
      <div>
        <p>{item.content}</p>
        <span>{getPriorityLabel(item.priority)}</span>
      </div>
    ),
  })}
/>`;

export function BoardExample() {
  const [lists, setLists] = useState(basicBoardData);

  return (
    <ExampleSection
      title="看板模式 (DndBoard)"
      description="支持列表拖拽排序和跨列表项目移动"
      code={CODE}
      codePath="examples/basic-example/board-example"
    >
      <DndBoard
        lists={lists}
        onListsChange={setLists}
        listProps={(list) => ({
          style: { backgroundColor: list.color + "10" },
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
            <div className="rdb:space-y-2">
              <p className="rdb:text-slate-800">{item.content}</p>
              <span
                className={`rdb:inline-block rdb:rounded rdb:px-2 rdb:py-1 rdb:text-xs rdb:font-medium ${getPriorityColor(item.priority)}`}
              >
                {getPriorityLabel(item.priority)}
              </span>
            </div>
          ),
        })}
      />
    </ExampleSection>
  );
}
