import type { BaseDndData, DndClassName } from "@/lib/types";
import { cn } from "@/shared/utils/cn";
import { Draggable } from "@hello-pangea/dnd";

export interface DndItemProps<T extends BaseDndData> {
  data: T;
  index: number;
  /**
   * 不建议额外设置过渡：transition； 会和拖拽动画冲突
   */
  rootClassName?: DndClassName;
  className?: DndClassName;
  style?: React.CSSProperties;
  isDragDisabled?: boolean | ((item: T) => boolean);
  children?: React.ReactNode | ((isDragging: boolean) => React.ReactNode);
}

export const DndItem = <T extends BaseDndData>({
  data,
  index,
  rootClassName,
  className,
  style,
  isDragDisabled: isDragDisabledProp,
  children,
}: DndItemProps<T>) => {
  const isDragDisabled =
    typeof isDragDisabledProp === "function"
      ? isDragDisabledProp(data)
      : isDragDisabledProp;

  return (
    <Draggable
      index={index}
      draggableId={data.id.toString()}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          aria-disabled={isDragDisabled}
          aria-label={data.label || "Draggable Item"}
          style={{
            ...provided.draggableProps.style,
            ...style,
          }}
          className={cn(
            rootClassName,
            typeof rootClassName === "function"
              ? rootClassName(snapshot.isDragging)
              : rootClassName,
          )}
        >
          <div
            className={cn(
              // 基础样式
              "rdb:rounded-md",
              "rdb:border rdb:border-slate-200 rdb:bg-white",
              "rdb:p-3 rdb:shadow-sm rdb:transition-all",
              // 光标样式 - 只在非自定义手柄模式下应用
              !isDragDisabled && "active:rdb:cursor-grabbing rdb:cursor-grab",
              isDragDisabled && "rdb:cursor-default",
              // hover 效果（不使用 transition）
              !snapshot.isDragging &&
                "rdb:hover:border-slate-300 rdb:hover:shadow-md",
              // 拖拽状态样式
              snapshot.isDragging &&
                "rdb:bg-white/90 rdb:shadow-md rdb:backdrop-blur-lg",
              // 自定义类名
              typeof className === "function"
                ? className(snapshot.isDragging)
                : className,
            )}
          >
            {typeof children === "function"
              ? children(snapshot.isDragging)
              : children}
          </div>
        </div>
      )}
    </Draggable>
  );
};
