import { DndBoard } from "@/lib/components/dnd-board";
import type { DragResult } from "@/lib/types";
import { useState } from "react";
import { ExampleSection } from "../../components/example-section";
import { basicBoardData } from "../../data/mock-data";
import { getPriorityColor, getPriorityLabel } from "../../data/utils";

const CODE = `import { DndBoard } from "@/lib/components/dnd-board";
import type { DragResult } from "@/lib/types";
import { useState } from "react";

export function ControlledBoardExample() {
  const [lists, setLists] = useState(basicBoardData);

  const handleDragEnd = (result: DragResult) => {
    console.log("拖拽结果:", result);
  };

  return (
    <DndBoard
      lists={lists}
      onListsChange={setLists}
      onDragEnd={handleDragEnd}
      renderListHeader={(list) => (
        <div className="..." style={{ backgroundColor: list.color }}>
          <span>{list.title}</span>
          <span>{list.items?.length || 0}</span>
        </div>
      )}
      renderItem={(item) => (
        <div>
          <p>{item.content}</p>
          <span>{getPriorityLabel(item.priority)}</span>
        </div>
      )}
    />
  );
}`;

export function ControlledBoardExample() {
  const [lists, setLists] = useState(basicBoardData);

  const handleDragEnd = (result: DragResult) => {
    console.log("拖拽结果:", result);
  };

  return (
    <ExampleSection
      title="受控模式 - DndBoard"
      description="父组件完全控制状态，通过 lists 和 onDragEnd/onListsChange 管理数据"
      codePath="examples/controlled-board-example"
      code={CODE}
    >
      <div className="rdb:space-y-4">
        <DndBoard
          lists={lists}
          onListsChange={setLists}
          onDragEnd={handleDragEnd}
          renderListHeader={(list) => (
            <div
              className="rdb:mb-3 rdb:flex rdb:items-center rdb:justify-between rdb:rounded-t-lg rdb:px-4 rdb:py-3 rdb:font-semibold rdb:text-white"
              style={{ backgroundColor: list.color }}
            >
              <span>{list.title}</span>
              <span className="rdb:rounded rdb:bg-white/20 rdb:px-2 rdb:py-1 rdb:text-sm">
                {list.items?.length || 0}
              </span>
            </div>
          )}
          renderItem={(item) => (
            <div className="rdb:space-y-2">
              <p className="rdb:text-slate-800">{item.content}</p>
              <span
                className={`rdb:inline-block rdb:rounded rdb:px-2 rdb:py-1 rdb:text-xs rdb:font-medium ${getPriorityColor(item.priority)}`}
              >
                {getPriorityLabel(item.priority)}
              </span>
            </div>
          )}
        />
      </div>
    </ExampleSection>
  );
}
