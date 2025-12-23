import type { BaseDndData, BoardList, DroppableClassName } from "@/lib/types";
import { validateBoardLists } from "@/lib/utils/validation";
import { cn } from "@/shared/utils/cn";
import { Droppable } from "@hello-pangea/dnd";
import { DndContext, type PickedDndContextProps } from "../dnd-context";
import { DndList, type DndListProps } from "../dnd-list";
import { ErrorDisplay } from "../error-display";

export type BoardListProps<T extends BaseDndData, S extends BaseDndData> = Omit<
  DndListProps<T, S>,
  "data" | "items" | "index" | "onItemsChange"
>;

export type DndBoardProps<T extends BaseDndData, S extends BaseDndData> = {
  lists: BoardList<T, S>[];
  className?: DroppableClassName;
  style?: React.CSSProperties;
  rootClassName?: string;
  /** 横向布局: 默认为 true */
  horizontal?: boolean;
  /**
   * 传递给每个列表的属性
   * 可以是一个对象，也可以是一个根据列表数据返回对象的函数
   */
  listProps?:
    | BoardListProps<T, S>
    | ((list: BoardList<T, S>, index: number) => BoardListProps<T, S>);
  onListsChange?: (lists: BoardList<T, S>[]) => void;
} & PickedDndContextProps;

export const DndBoard = <T extends BaseDndData, S extends BaseDndData>({
  lists,
  className,
  style,
  rootClassName,
  horizontal = true,
  listProps,
  onListsChange,
}: DndBoardProps<T, S>) => {
  // 只验证 lists，items 由 DndList 验证
  const validationError = validateBoardLists(lists);

  if (validationError) {
    return <ErrorDisplay error={validationError} />;
  }

  return (
    <DndContext type="board" data={lists} onDataChange={onListsChange}>
      <div
        className={cn(
          "rdb:overflow-x-auto",
          "rdb:scrollbar-thin rdb:scrollbar-thumb-slate-400 rdb:scrollbar-track-slate-200",
          rootClassName,
        )}
      >
        <Droppable
          droppableId="board"
          type="list"
          direction={horizontal ? "horizontal" : "vertical"}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "rdb:flex",
                horizontal ? "rdb:flex-row" : "rdb:flex-col",
                typeof className === "function"
                  ? className(snapshot.isDraggingOver)
                  : className,
              )}
              style={style}
            >
              {lists.map((list, index) => {
                const extraListProps =
                  typeof listProps === "function"
                    ? listProps(list, index)
                    : listProps;

                return (
                  <DndList
                    key={list.id}
                    data={list}
                    index={index}
                    items={list.items}
                    {...extraListProps}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DndContext>
  );
};
