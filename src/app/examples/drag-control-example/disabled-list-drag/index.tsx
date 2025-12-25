import { DndBoard } from "@/lib/components/dnd-board";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";
import { basicBoardData } from "../../../data/mock-data";

const CODE = `import { DndBoard } from "@/lib";
import { useState } from "react";

const [lists, setLists] = useState(basicBoardData);

// 禁用列表拖拽，项目仍可拖动
<DndBoard
  lists={lists}
  onListsChange={setLists}
  listProps={{ isDragDisabled: true }}
/>`;

export function DisabledListDrag() {
  const [lists, setLists] = useState(basicBoardData.slice(0, 2));

  return (
    <ExampleSection
      title="禁用列表拖拽"
      description="列表不可拖动，但项目可以在列表间拖动"
      codePath="examples/drag-control-example/disabled-list-drag"
      code={CODE}
    >
      <DndBoard
        lists={lists}
        onListsChange={setLists}
        listProps={(list) => ({
          isDragDisabled: true,
          renderHeader: (dragHandleProps) => (
            <div
              {...dragHandleProps}
              className="rdb:flex rdb:items-center rdb:justify-between rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white rdb:opacity-70"
              style={{ backgroundColor: list.color }}
            >
              <span>{list.title}</span>
              <span className="rdb:text-xs">🔒</span>
            </div>
          ),
        })}
      />
    </ExampleSection>
  );
}
