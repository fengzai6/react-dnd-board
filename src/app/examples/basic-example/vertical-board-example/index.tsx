import { DndBoard } from "@/lib/components/dnd-board";
import { useState } from "react";
import { ExampleSection } from "../../../components/example-section";
import { basicBoardData } from "../../../data/mock-data";

const CODE = `import { DndBoard } from "@/lib";
import { useState } from "react";

const [lists, setLists] = useState(basicBoardData);

<DndBoard
  lists={lists}
  onListsChange={setLists}
  horizontal={false}
  className="gap-4"
  listProps={(list) => ({
    className: "w-full",
    renderHeader: (dragHandleProps) => (
      <div {...dragHandleProps} style={{ backgroundColor: list.color }}>
        <span>{list.title}</span>
        <span>{list.items?.length || 0}</span>
      </div>
    ),
  })}
/>`;

export function VerticalBoardExample() {
  const [lists, setLists] = useState(basicBoardData.slice(0, 2));

  return (
    <ExampleSection
      title="垂直看板布局 (horizontal=false)"
      description="看板支持垂直布局方向"
      code={CODE}
      codePath="examples/basic-example/vertical-board-example"
    >
      <DndBoard
        lists={lists}
        onListsChange={setLists}
        horizontal={false}
        className="rdb:gap-4"
        listProps={(list) => ({
          className: "rdb:w-full",
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
        })}
      />
    </ExampleSection>
  );
}
