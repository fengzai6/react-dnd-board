import type { DndBoardProps, ListItems } from "@/lib/types";
import { detectControlModeSwitch } from "@/lib/utils/error-handler";
import { safeValidateLists } from "@/lib/utils/validation";
import { cn } from "@/shared/utils/cn";
import { Droppable } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import { DndContext } from "../dnd-context";
import { DndList } from "../dnd-list";
import { ErrorDisplay } from "../error-display";

export const DndBoard = <T extends object, I extends object>({
  lists: externalLists,
  initialLists,
  onDragEnd,
  onListsChange,
  className,
  style,
  boardClassName,
  listClassName,
  itemClassName,
  renderItem,
  renderListHeader,
  enableListDrag = true,
  enableItemDrag = true,
}: DndBoardProps<T, I>) => {
  // 1. State Management
  const isControlled = externalLists !== undefined;
  const wasControlledRef = useRef<boolean>(isControlled);
  const [internalLists, setInternalLists] = useState<ListItems<T, I>>(
    initialLists || [],
  );
  const lists = isControlled ? externalLists : internalLists;

  // 2. 受控/非受控模式切换警告
  useEffect(() => {
    detectControlModeSwitch("DndBoard", wasControlledRef.current, isControlled);
    wasControlledRef.current = isControlled;
  }, [isControlled]);

  // 3. Validation
  const validation = safeValidateLists<T, I>(lists);
  if (!validation.isValid) {
    return (
      <ErrorDisplay
        componentName="DndBoard"
        error={validation.error || "Invalid lists data"}
        className={className}
      />
    );
  }

  // 4. Empty lists friendly message
  if (lists.length === 0) {
    return (
      <div
        className={cn(
          "rdb:flex rdb:items-center rdb:justify-center",
          "rdb:rounded-lg rdb:border-2 rdb:border-dashed rdb:border-slate-300",
          "rdb:bg-slate-50 rdb:p-8",
          "rdb:min-h-[400px]",
          className,
        )}
        style={style}
      >
        <div className="rdb:text-center">
          <svg
            className="rdb:mx-auto rdb:h-12 rdb:w-12 rdb:text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="rdb:mt-2 rdb:text-sm rdb:font-medium rdb:text-slate-900">
            暂无列表
          </h3>
          <p className="rdb:mt-1 rdb:text-sm rdb:text-slate-500">
            开始添加列表来组织您的内容
          </p>
        </div>
      </div>
    );
  }
  // 5. Handle Data Change
  const handleDataChange = (newData: ListItems<T, I>) => {
    if (isControlled) {
      onListsChange?.(newData);
    } else {
      setInternalLists(newData);
    }
  };

  return (
    <DndContext
      type="board"
      data={lists}
      onDataChange={handleDataChange}
      onDragEnd={onDragEnd}
    >
      {/* 水平列表容器 */}
      <div
        className={cn(
          // 默认样式 - 支持水平滚动
          "rdb:flex rdb:space-x-4 rdb:overflow-x-auto rdb:p-4",
          // 背景和边框 - 使用渐变背景
          "rdb:rounded-lg rdb:bg-linear-to-br rdb:from-slate-50 rdb:to-slate-100",
          // 滚动条样式
          "rdb:scrollbar-thin rdb:scrollbar-thumb-slate-400 rdb:scrollbar-track-slate-200",
          // 最小高度
          "rdb:min-h-[400px]",
          // 自定义类名
          className,
        )}
        style={style}
      >
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn("rdb:flex rdb:space-x-4", boardClassName)}
            >
              {lists.map((list, index) => (
                <DndList
                  key={list.id}
                  list={list}
                  index={index}
                  className={listClassName}
                  itemProps={{
                    enableDrag: enableItemDrag,
                    className: itemClassName,
                  }}
                  renderItem={renderItem}
                  renderHeader={renderListHeader}
                  enableDrag={enableListDrag}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DndContext>
  );
};
