import { DndBoard } from "@/lib/components/dnd-board";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";
import { basicBoardData } from "../../../data/mock-data";

const CODE = `import { DndBoard } from "@/lib";
import { useState } from "react";

const [lists, setLists] = useState(basicBoardData);

// 禁用项目拖拽，列表仍可拖动
<DndBoard
  lists={lists}
  onListsChange={setLists}
  listProps={{
    itemProps: { isDragDisabled: true }
  }}
/>`;

export function DisabledItemDrag() {
  const [lists, setLists] = useState(basicBoardData.slice(0, 2));

  return (
    <ExampleSection
      title="禁用项目拖拽"
      description="列表可拖动，但项目不可拖动"
      codePath="examples/drag-control-example/disabled-item-drag"
      code={CODE}
    >
      <DndBoard
        lists={lists}
        onListsChange={setLists}
        listProps={(list) => ({
          itemProps: { isDragDisabled: true },
          renderHeader: (dragHandleProps) => (
            <div
              {...dragHandleProps}
              className="rdb:flex rdb:items-center rdb:justify-between rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white"
              style={{ backgroundColor: list.color }}
            >
              <span>{list.title}</span>
            </div>
          ),
          renderItem: (item) => (
            <div className="rdb:text-sm rdb:text-slate-500">
              {item.content} 🔒
            </div>
          ),
        })}
      />
    </ExampleSection>
  );
}
