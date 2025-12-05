import type { DragResult } from "@/lib/types";
import {
  arrayMove,
  handleItemDragBetweenLists,
  handleItemDragWithinList,
} from "@/lib/utils/drag-handler";
import {
  devError,
  isValidDragResult,
  safeCallOnDragEnd,
} from "@/lib/utils/error-handler";
import {
  isBoardMode,
  isListMode,
  type DndContextModeProps,
} from "@/lib/utils/type-guards";
import {
  DragDropContext,
  type DragDropContextProps,
  type DropResult,
  type OnDragStartResponder,
} from "@hello-pangea/dnd";
import type { ReactNode } from "react";

// 组合 Props
type DndContextProps<T extends object, I extends object = object> = {
  children: ReactNode;
  // 允许用户覆盖或扩展默认的 onDragEnd 行为
  onDragEnd?: (result: DragResult) => void;
  // 透传给 DragDropContext 的其他 props
  dragDropContextProps?: Omit<DragDropContextProps, "onDragEnd">;
} & DndContextModeProps<T, I>;

export const DndContext = <T extends object, I extends object = object>(
  props: DndContextProps<T, I>
) => {
  const { children, onDragEnd, dragDropContextProps } = props;

  const handleDragStart: OnDragStartResponder = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    document.dispatchEvent(new MouseEvent("click"));
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type: dragType, draggableId } = result;

    // 转换 result 为我们自定义的 DragResult 类型
    const dragResult: DragResult = {
      type: dragType === "list" ? "list" : "item",
      source: {
        droppableId: source.droppableId,
        index: source.index,
      },
      destination: destination
        ? {
            droppableId: destination.droppableId,
            index: destination.index,
          }
        : null,
      draggableId,
    };

    // 验证拖拽结果的有效性
    if (!isValidDragResult(dragResult)) {
      devError("Invalid drag result received");
      return;
    }

    // 如果用户提供了 onDragEnd，安全地调用它
    if (onDragEnd) {
      safeCallOnDragEnd(onDragEnd, dragResult);
    }

    // 如果没有目的地，或者位置没有改变，直接返回
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // 使用类型守卫函数处理列表模式
    if (isListMode(props)) {
      const newData = arrayMove(props.data, source.index, destination.index);
      props.onDataChange(newData);
      return;
    }

    // 使用类型守卫函数处理看板模式
    if (isBoardMode(props)) {
      // 1. 列表本身的排序 (列排序)
      if (dragType === "list") {
        const newData = arrayMove(props.data, source.index, destination.index);
        props.onDataChange(newData);
        return;
      }

      // 2. 列表内的项目排序 (卡片排序)
      if (source.droppableId === destination.droppableId) {
        const newData = handleItemDragWithinList(
          props.data,
          source.droppableId,
          source.index,
          destination.index
        );
        props.onDataChange(newData);
      } else {
        // 3. 跨列表的项目移动
        const newData = handleItemDragBetweenLists(
          props.data,
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index
        );
        props.onDataChange(newData);
      }
    }
  };

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      {...dragDropContextProps}
    >
      {children}
    </DragDropContext>
  );
};
