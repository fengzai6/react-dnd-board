import type { BaseDndData, DroppableClassName } from "@/lib/types";
import { validateData, validateItems } from "@/lib/utils/validation";
import { cn } from "@/shared/utils/cn";
import {
  Draggable,
  Droppable,
  type DraggableProvided,
  type DraggableProvidedDragHandleProps,
  type DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { DndContext, type PickedDndContextProps } from "../dnd-context";
import { DndItem, type DndItemProps } from "../dnd-item";
import { ErrorDisplay } from "../error-display";

interface DndListClassNames {
  header?: DroppableClassName;
  /**
   * 不建议设置 backdrop-blur，否则会偏移
   */
  content?: DroppableClassName;
}

type ItemProps<T extends BaseDndData> = Omit<
  DndItemProps<T>,
  "index" | "data" | "children"
>;

export type DndListProps<T extends BaseDndData, S extends BaseDndData> = {
  data: T;
  items?: S[];
  index?: number;
  className?: DroppableClassName;
  classNames?: DndListClassNames;
  style?: React.CSSProperties;
  isDragDisabled?: boolean | ((data: T) => boolean);
  isDropDisabled?: boolean | ((data: T) => boolean);
  /** 横向布局 */
  horizontal?: boolean;
  itemProps?: ItemProps<S> | ((item: S, index: number) => ItemProps<S>);
  renderHeader?:
    | ((
        dragHandleProps?: DraggableProvidedDragHandleProps | null,
      ) => React.ReactNode)
    | boolean;
  renderItem?: (item: S, index: number, isDragging: boolean) => React.ReactNode;
  onItemsChange?: (items: S[]) => void;
} & PickedDndContextProps;

export const DndList = <T extends BaseDndData, S extends BaseDndData>({
  data,
  items = [],
  index,
  className,
  classNames = {},
  style,
  isDragDisabled: isDragDisabledProp,
  isDropDisabled: isDropDisabledProp,
  itemProps,
  horizontal,
  renderHeader,
  renderItem,
  onItemsChange,
}: DndListProps<T, S>) => {
  const isDragDisabled =
    typeof isDragDisabledProp === "function"
      ? isDragDisabledProp(data)
      : isDragDisabledProp;

  const isDropDisabled =
    typeof isDropDisabledProp === "function"
      ? isDropDisabledProp(data)
      : isDropDisabledProp;

  // 是否为看板的列表
  const isBoardList = typeof index === "number";

  // 验证 data
  const dataError = validateData(data);
  if (dataError) {
    return <ErrorDisplay error={dataError} />;
  }

  // 验证 items
  const itemsError = validateItems(items, `List "${data.id}"`);
  if (itemsError) {
    return <ErrorDisplay error={itemsError} />;
  }

  const renderDefaultItem = (item: S) => {
    return <div className="rdb:text-slate-700">{item.label || item.id}</div>;
  };

  const renderListContent = (
    provided?: DraggableProvided,
    snapshot?: DraggableStateSnapshot,
  ) => {
    return (
      <Droppable
        droppableId={String(data.id)}
        type="item"
        isDropDisabled={isDropDisabled}
        direction={horizontal ? "horizontal" : "vertical"}
      >
        {(dropProvided, dropSnapshot) => (
          <div
            {...dropProvided.droppableProps}
            className={cn(
              "rdb:min-w-[280px]",
              "rdb:rounded-lg rdb:border rdb:border-slate-200 rdb:bg-white",
              "rdb:shadow-sm rdb:transition-all",
              snapshot?.isDragging &&
                "rdb:bg-white/70 rdb:shadow-md rdb:backdrop-blur-lg",
              typeof className === "function"
                ? className(
                    Boolean(dropSnapshot.isDraggingOver),
                    Boolean(snapshot?.isDragging),
                  )
                : className,
            )}
            style={style}
          >
            {/* Header */}
            {typeof renderHeader === "function" ? (
              renderHeader(provided?.dragHandleProps)
            ) : typeof renderHeader === "boolean" && !renderHeader ? null : (
              <div
                {...provided?.dragHandleProps}
                className={cn(
                  "rdb:flex rdb:items-center rdb:justify-between rdb:border-b rdb:border-slate-200 rdb:p-4",
                  typeof classNames.header === "function"
                    ? classNames.header(
                        Boolean(dropSnapshot.isDraggingOver),
                        Boolean(snapshot?.isDragging),
                      )
                    : classNames.header,
                )}
              >
                {data.label ? data.label : data.id.toString()}
              </div>
            )}
            {/* Content */}
            <div
              ref={dropProvided.innerRef}
              className={cn(
                "rdb:flex rdb:p-4",
                horizontal ? "rdb:flex-row" : "rdb:flex-col",
                dropSnapshot.isDraggingOver && "",
                typeof classNames.content === "function"
                  ? classNames.content(
                      Boolean(dropSnapshot.isDraggingOver),
                      Boolean(snapshot?.isDragging),
                    )
                  : classNames.content,
              )}
            >
              {items.map((item, idx) => {
                const extraItemProps =
                  typeof itemProps === "function"
                    ? itemProps(item, idx)
                    : itemProps;

                return (
                  <DndItem
                    key={item.id}
                    data={item}
                    index={idx}
                    {...extraItemProps}
                  >
                    {(isDragging) =>
                      renderItem
                        ? renderItem(item, idx, isDragging)
                        : renderDefaultItem(item)
                    }
                  </DndItem>
                );
              })}
              {dropProvided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    );
  };

  if (isBoardList) {
    return (
      <Draggable
        draggableId={String(data.id)}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            {renderListContent(provided, snapshot)}
          </div>
        )}
      </Draggable>
    );
  }

  return (
    <DndContext type="list" data={items} onDataChange={onItemsChange}>
      {renderListContent()}
    </DndContext>
  );
};
