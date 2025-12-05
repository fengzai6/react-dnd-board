import type { DndItem as DndItemType, ListItem } from "@/lib/types";
import { detectControlModeSwitch } from "@/lib/utils/error-handler";
import { safeValidateListItem } from "@/lib/utils/validation";
import { cn } from "@/shared/utils/cn";
import {
  Draggable,
  Droppable,
  type DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import { DndContext } from "../dnd-context";
import { DndItem, type DndItemProps } from "../dnd-item";
import { ErrorDisplay } from "../error-display";

type ItemProps<I extends object> = Partial<
  Omit<DndItemProps<I>, "item" | "index" | "children">
>;

// DndList 组件 Props
export interface DndListProps<T extends object, I extends object> {
  list?: ListItem<T, I>; // 受控模式数据
  initialList?: ListItem<T, I>; // 非受控模式初始数据
  index?: number; // 在看板中的索引（仅看板模式需要）
  className?: string;
  style?: React.CSSProperties;
  enableDrag?: boolean;
  itemProps?: ItemProps<I>;
  onListChange?: (list: ListItem<T, I>) => void;
  renderItem?: (item: DndItemType<I>) => React.ReactNode;
  renderHeader?: (list: ListItem<T, I>) => React.ReactNode;
}

export const DndList = <T extends object, I extends object>({
  list: externalList,
  initialList,
  index,
  className,
  style,
  enableDrag = true,
  itemProps,
  onListChange,
  renderItem,
  renderHeader,
}: DndListProps<T, I>) => {
  // 1. State Management
  const isControlled = externalList !== undefined;
  const wasControlledRef = useRef<boolean>(isControlled);

  const [internalList, setInternalList] = useState<ListItem<T, I> | undefined>(
    initialList,
  );

  const list = isControlled ? externalList : internalList;

  // 2. 受控/非受控模式切换警告
  useEffect(() => {
    detectControlModeSwitch("DndList", wasControlledRef.current, isControlled);
    wasControlledRef.current = isControlled;
  }, [isControlled]);

  // 3. 判断是否为看板模式
  const isBoardList = index !== undefined;

  // 4. 看板模式下验证 index 的存在性
  if (isBoardList && typeof index !== "number") {
    return (
      <ErrorDisplay
        componentName="DndList"
        error="Index is required when DndList is used in board mode"
        className={className}
      />
    );
  }

  // 5. 验证 list 数据
  if (!list) {
    return (
      <ErrorDisplay
        componentName="DndList"
        error="List data is required"
        className={className}
      />
    );
  }

  const validation = safeValidateListItem<T, I>(list);
  if (!validation.isValid) {
    return (
      <ErrorDisplay
        componentName="DndList"
        error={validation.error || "Invalid list data"}
        className={className}
      />
    );
  }

  // 6. 确保 items 始终为数组
  const items = list.items || [];

  // 7. 默认标题渲染
  const defaultHeader = (
    <div className="rdb:mb-3 rdb:border-b rdb:border-slate-200 rdb:pb-2 rdb:text-base rdb:font-semibold rdb:text-slate-800">
      {list.id}
    </div>
  );

  // 8. 默认项目渲染
  const defaultRenderItem = (item: DndItemType<I>) => (
    <div className="rdb:text-sm rdb:text-slate-700">{String(item.id)}</div>
  );

  // 9. 使用自定义渲染或默认渲染
  const headerContent = renderHeader ? renderHeader(list) : defaultHeader;
  const itemRenderer = renderItem || defaultRenderItem;

  // 10. 渲染列表内容（不包含 Draggable 包装）
  const renderListContent = (
    isDragging?: boolean,
    dragHandleProps?: DraggableProvidedDragHandleProps | null,
  ) => {
    return (
      <div
        className={cn(
          // 基础样式
          "rdb:flex rdb:min-w-[280px] rdb:flex-col",
          "rdb:rounded-lg rdb:border rdb:border-slate-200 rdb:bg-white",
          "rdb:p-4 rdb:shadow-md",
          // 拖拽状态样式（不使用 transition）
          isDragging && "rdb:opacity-80 rdb:shadow-2xl",
          className,
        )}
        style={style}
      >
        {/* 列表标题 - 作为拖拽手柄 */}
        <div
          {...dragHandleProps}
          className={cn(
            // 标题样式
            enableDrag && "active:rdb:cursor-grabbing rdb:cursor-grab",
            // 如果不可拖拽，使用默认光标
            !enableDrag && "rdb:cursor-default",
          )}
        >
          {headerContent}
        </div>

        {/* 项目容器 - Droppable 区域 */}
        <Droppable droppableId={String(list.id)} type="item">
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className={cn(
                // 默认样式 - 支持垂直滚动
                "rdb:flex rdb:min-h-[100px] rdb:flex-col rdb:overflow-y-auto",
                // 最大高度和滚动
                "rdb:max-h-[600px]",
                // 滚动条样式
                "rdb:scrollbar-thin rdb:scrollbar-thumb-slate-400 rdb:scrollbar-track-transparent",
                // 圆角和内边距
                "rdb:rounded rdb:p-1",
                // 边框 - 默认透明，防止拖拽时抖动
                "rdb:border rdb:border-transparent",
                // 拖拽悬停状态
                droppableSnapshot.isDraggingOver &&
                  "rdb:border-dashed rdb:border-blue-400 rdb:bg-blue-50",
              )}
            >
              {/* 条件渲染优化：只在有项目时渲染 */}
              {items.length > 0 &&
                items.map((item, itemIndex) => (
                  <DndItem
                    key={item.id}
                    item={item}
                    index={itemIndex}
                    {...itemProps}
                  >
                    {(item) => itemRenderer(item)}
                  </DndItem>
                ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  // 11. 独立列表模式：使用 DndContext 包裹，不使用 Draggable
  if (!isBoardList) {
    return (
      <DndContext
        type="list"
        data={items}
        onDataChange={(newItems) => {
          const newList = { ...list, items: newItems };
          if (isControlled) {
            onListChange?.(newList);
          } else {
            setInternalList(newList);
          }
        }}
      >
        {renderListContent()}
      </DndContext>
    );
  }

  // 12. 看板模式：使用 Draggable 包裹
  return (
    <Draggable
      draggableId={String(list.id)}
      index={index}
      isDragDisabled={!enableDrag}
    >
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            {renderListContent(snapshot.isDragging, provided.dragHandleProps)}
          </div>
        );
      }}
    </Draggable>
  );
};
