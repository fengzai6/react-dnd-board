import type { DndItem as DndItemType } from "@/lib/types";
import { cn } from "@/shared/utils/cn";
import {
  Draggable,
  type DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";

// 使用更清晰的联合类型定义
export type DndItemProps<I extends object> = {
  item: DndItemType<I>;
  index: number;
  className?: string | ((isDragging: boolean) => string);
  style?: React.CSSProperties;
  enableDrag?: boolean;
} & (
  | {
      useCustomDragHandle?: false;
      children: (item: DndItemType<I>) => React.ReactNode;
    }
  | {
      useCustomDragHandle: true;
      children: (
        item: DndItemType<I>,
        dragHandleProps: DraggableProvidedDragHandleProps | null,
      ) => React.ReactNode;
    }
);

export const DndItem = <I extends object>(
  props: DndItemProps<I>,
): React.ReactElement => {
  const {
    item,
    index,
    children,
    className,
    style,
    enableDrag = true,
    useCustomDragHandle = false,
  } = props;

  return (
    <Draggable
      draggableId={String(item.id)}
      index={index}
      isDragDisabled={!enableDrag}
    >
      {(provided, snapshot) => {
        const isDragging = snapshot.isDragging;

        // 根据 useCustomDragHandle 决定传递给 children 的参数
        const content = useCustomDragHandle
          ? (
              children as (
                item: DndItemType<I>,
                dragHandleProps: DraggableProvidedDragHandleProps | null,
              ) => React.ReactNode
            )(item, provided.dragHandleProps)
          : (children as (item: DndItemType<I>) => React.ReactNode)(item);

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            // 如果使用自定义拖拽手柄，则不在这里应用 dragHandleProps
            {...(!useCustomDragHandle && provided.dragHandleProps)}
            className={cn(
              // 基础样式
              "rdb:mb-2 rdb:rounded-md",
              "rdb:border rdb:border-slate-200 rdb:bg-white",
              "rdb:p-3 rdb:shadow-sm",
              // 光标样式 - 只在非自定义手柄模式下应用
              !useCustomDragHandle &&
                enableDrag &&
                "active:rdb:cursor-grabbing rdb:cursor-grab",
              !useCustomDragHandle && !enableDrag && "rdb:cursor-default",
              // hover 效果（不使用 transition）
              !isDragging && "hover:rdb:shadow-md hover:rdb:border-slate-300",
              // 拖拽状态样式
              isDragging &&
                "rdb:border-blue-400 rdb:bg-blue-50 rdb:opacity-75 rdb:shadow-2xl",
              // 自定义类名
              typeof className === "function"
                ? className(isDragging)
                : className,
            )}
            style={{
              ...provided.draggableProps.style,
              ...style,
            }}
          >
            {content}
          </div>
        );
      }}
    </Draggable>
  );
};
