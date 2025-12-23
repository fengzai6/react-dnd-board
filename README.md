# React DnD Board 组件库

基于 @hello-pangea/dnd 的 React 拖拽组件库，提供开箱即用的面板和列表组件。

## 安装

```bash
yarn add react-dnd-board @hello-pangea/dnd
```

### 依赖要求

- React >= 18.0.0
- @hello-pangea/dnd >= 18.0.0

## 快速开始

### 基础看板示例

```tsx
import { DndBoard } from "react-dnd-board";
import "react-dnd-board/style.css";
import { useState } from "react";

function App() {
  const [lists, setLists] = useState([
    {
      id: "list-1",
      label: "待办",
      items: [
        { id: "item-1", label: "任务 1" },
        { id: "item-2", label: "任务 2" },
      ],
    },
    {
      id: "list-2",
      label: "进行中",
      items: [{ id: "item-3", label: "任务 3" }],
    },
  ]);

  return <DndBoard lists={lists} onListsChange={setLists} />;
}
```

### 基础列表示例

```tsx
import { DndList } from "react-dnd-board";
import "react-dnd-board/style.css";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { id: "item-1", label: "任务 1" },
    { id: "item-2", label: "任务 2" },
  ]);

  return (
    <DndList
      data={{ id: "list-1", label: "我的列表" }}
      items={items}
      onItemsChange={setItems}
    />
  );
}
```

## API

### 类型导出

```tsx
import type {
  BaseDndData, // 基础拖拽数据类型
  BoardList, // 列表项类型（包含 items）
  DragResult, // 拖拽结果类型
  DndBoardProps, // DndBoard 组件 Props 类型
  DndListProps, // DndList 组件 Props 类型
  DndItemProps, // DndItem 组件 Props 类型
  DndClassName, // 拖拽项类名类型
  DroppableClassName, // 可放置区域类名类型
} from "react-dnd-board";
```

### 组件导出

```tsx
import {
  DndBoard, // 拖拽面板组件
  DndItem, // 拖拽项组件
  DndList, // 拖拽列表组件
} from "react-dnd-board";
```

### 工具函数导出

```tsx
import {
  // 拖拽处理函数
  handleListDrag, // 处理列表拖拽（数组移动）
  handleItemDragWithinList, // 处理列表内项目拖拽
  handleItemDragBetweenLists, // 处理跨列表项目拖拽

  // 数据验证函数
  validateLists, // 验证列表数据
  validateUniqueIds, // 验证 ID 唯一性
} from "react-dnd-board";
```

## DndBoard Props

| 属性          | 类型                                                | 必需 | 默认值 | 描述                                     |
| ------------- | --------------------------------------------------- | ---- | ------ | ---------------------------------------- |
| lists         | BoardList<T, S>[]                                   | ✓    | -      | 列表数据数组                             |
| onListsChange | (lists: BoardList<T, S>[]) => void                  | -    | -      | 列表变化回调                             |
| className     | DroppableClassName                                  | -    | -      | 面板容器类名（支持函数）                 |
| style         | React.CSSProperties                                 | -    | -      | 面板容器样式                             |
| rootClassName | string                                              | -    | -      | 外层容器类名                             |
| horizontal    | boolean                                             | -    | true   | 是否横向布局                             |
| listProps     | BoardListProps \| ((list, index) => BoardListProps) | -    | -      | 传递给每个列表的属性（支持函数动态返回） |

### BoardList 类型

```tsx
type BoardList<T, S> = T & {
  items?: S[];
};
```

其中 `T` 和 `S` 必须继承 `BaseDndData`：

```tsx
interface BaseDndData {
  id: string | number;
  label?: string;
}
```

## DndList Props

| 属性           | 类型                                                       | 必需 | 默认值 | 描述                             |
| -------------- | ---------------------------------------------------------- | ---- | ------ | -------------------------------- |
| data           | T extends BaseDndData                                      | ✓    | -      | 列表数据（必须包含 id）          |
| items          | S[]                                                        | -    | []     | 列表项数组                       |
| index          | number                                                     | -    | -      | 在看板中的索引（仅看板模式需要） |
| onItemsChange  | (items: S[]) => void                                       | -    | -      | 项目变化回调                     |
| className      | DroppableClassName                                         | -    | -      | 列表容器类名（支持函数）         |
| classNames     | { header?, content? }                                      | -    | -      | 各部分类名                       |
| style          | React.CSSProperties                                        | -    | -      | 列表容器样式                     |
| isDragDisabled | boolean \| ((data: T) => boolean)                          | -    | -      | 是否禁用列表拖拽                 |
| isDropDisabled | boolean \| ((data: T) => boolean)                          | -    | -      | 是否禁用放置                     |
| horizontal     | boolean                                                    | -    | false  | 是否横向布局                     |
| itemProps      | ItemProps \| ((item, index) => ItemProps)                  | -    | -      | 传递给子项目的 props             |
| renderHeader   | ((dragHandleProps?) => ReactNode) \| boolean               | -    | -      | 自定义标题渲染（false 则不渲染） |
| renderItem     | (item: S, index: number, isDragging: boolean) => ReactNode | -    | -      | 自定义项目渲染                   |

## DndItem Props

| 属性           | 类型                               | 必需 | 默认值 | 描述                 |
| -------------- | ---------------------------------- | ---- | ------ | -------------------- |
| data           | T extends BaseDndData              | ✓    | -      | 项目数据             |
| index          | number                             | ✓    | -      | 项目索引             |
| className      | DndClassName                       | -    | -      | 项目类名（支持函数） |
| style          | React.CSSProperties                | -    | -      | 项目样式             |
| isDragDisabled | boolean                            | -    | false  | 是否禁用拖拽         |
| children       | (isDragging: boolean) => ReactNode | ✓    | -      | 渲染函数             |

## 自定义渲染示例

### 自定义项目渲染

```tsx
<DndBoard
  lists={lists}
  onListsChange={setLists}
  listProps={{
    renderItem: (item) => (
      <div className="custom-item">
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    ),
  }}
/>
```

### 自定义列表标题

```tsx
<DndBoard
  lists={lists}
  onListsChange={setLists}
  listProps={(list) => ({
    renderHeader: (dragHandleProps) => (
      <div {...dragHandleProps} className="custom-header">
        <h3>{list.label}</h3>
        <span>{list.items?.length || 0} 项</span>
      </div>
    ),
  })}
/>
```

### 动态配置列表属性

```tsx
<DndBoard
  lists={lists}
  onListsChange={setLists}
  listProps={(list, index) => ({
    style: { backgroundColor: list.color },
    renderHeader: (dragHandleProps) => (
      <div {...dragHandleProps}>
        <h3>{list.label}</h3>
      </div>
    ),
    renderItem: (item, idx, isDragging) => (
      <div className={isDragging ? "opacity-50" : ""}>
        {item.label}
      </div>
    ),
  })}
/>
```

### 单独使用 DndList

```tsx
<DndList
  data={{ id: "list-1", label: "待办事项" }}
  items={items}
  onItemsChange={setItems}
  renderHeader={() => (
    <div className="custom-header">
      <h3>待办事项</h3>
    </div>
  )}
  renderItem={(item, index, isDragging) => (
    <div className={isDragging ? "opacity-50" : ""}>
      {item.label}
    </div>
  )}
/>
```

## 工具函数使用

### 手动处理拖拽（高级用法）

如果你需要完全自定义拖拽逻辑，可以使用提供的工具函数：

```tsx
import {
  handleListDrag,
  handleItemDragWithinList,
  handleItemDragBetweenLists,
} from "react-dnd-board";

// 注意：DndBoard 和 DndList 已经内置处理了拖拽逻辑
// 这些工具函数主要用于自定义场景

// 处理列表拖拽
const newLists = handleListDrag(lists, sourceIndex, destinationIndex);

// 处理同一列表内的项目拖拽
const newLists = handleItemDragWithinList(
  lists,
  listId,
  sourceIndex,
  destinationIndex
);

// 处理跨列表的项目拖拽
const newLists = handleItemDragBetweenLists(
  lists,
  sourceListId,
  destinationListId,
  sourceIndex,
  destinationIndex
);
```

### 数据验证

```tsx
import { validateLists, validateUniqueIds } from "react-dnd-board";

// 验证列表数据结构
const validation = validateLists(lists);
if (!validation.isValid) {
  console.error(validation.error);
}

// 验证 ID 唯一性
const uniqueValidation = validateUniqueIds(lists);
if (!uniqueValidation.isValid) {
  console.error(uniqueValidation.error);
}
```

## 特性

- ✅ **简单易用**：最小化配置，数据驱动的 API
- ✅ **类型安全**：完整的 TypeScript 泛型支持
- ✅ **灵活模式**：支持受控和非受控两种模式
- ✅ **高度可定制**：支持样式和渲染自定义
- ✅ **错误处理**：内置数据验证和友好的错误提示
- ✅ **开发体验**：开发模式下的警告和调试信息

## 许可证

MIT
