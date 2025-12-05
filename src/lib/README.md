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

### 受控模式（推荐）

```tsx
import { DndBoard } from "react-dnd-board";
import "react-dnd-board/style.css";

function App() {
  const [lists, setLists] = useState([
    {
      id: "list-1",
      title: "待办",
      items: [
        { id: "item-1", content: "任务 1" },
        { id: "item-2", content: "任务 2" },
      ],
    },
    {
      id: "list-2",
      title: "进行中",
      items: [{ id: "item-3", content: "任务 3" }],
    },
  ]);

  return <DndBoard lists={lists} onListsChange={setLists} />;
}
```

### 非受控模式

```tsx
function App() {
  return (
    <DndBoard
      initialLists={[
        {
          id: "list-1",
          title: "待办",
          items: [{ id: "item-1", content: "任务 1" }],
        },
      ]}
      onDragEnd={(result) => {
        console.log("拖拽结束:", result);
      }}
    />
  );
}
```

## API

### 类型导出

```tsx
import type {
  DndItemType, // 拖拽项类型
  ListItem, // 列表项类型
  ListItems, // 列表数组类型
  DragResult, // 拖拽结果类型
  DndBoardProps, // DndBoard 组件 Props 类型
} from "react-dnd-board";
```

### 组件导出

```tsx
import {
  DndBoard, // 拖拽面板组件
  DndItem, // 拖拽项组件
  DndList, // 拖拽列表组件
} from "react-dnd-board";

// 组件 Props 类型也可以单独导入
import type { DndItemProps, DndListProps } from "react-dnd-board";
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

| 属性             | 类型                                | 必需 | 默认值 | 描述                     |
| ---------------- | ----------------------------------- | ---- | ------ | ------------------------ |
| lists            | ListItems<T, I>                     | -    | -      | 受控模式：列表数据数组   |
| initialLists     | ListItems<T, I>                     | -    | -      | 非受控模式：初始列表数据 |
| onListsChange    | (lists: ListItems<T, I>) => void    | -    | -      | 受控模式：列表变化回调   |
| onDragEnd        | (result: DragResult) => void        | -    | -      | 拖拽结束回调             |
| className        | string                              | -    | -      | 外层容器类名             |
| style            | React.CSSProperties                 | -    | -      | 外层容器样式             |
| boardClassName   | string                              | -    | -      | 面板容器类名             |
| listClassName    | string                              | -    | -      | 列表类名                 |
| itemClassName    | string                              | -    | -      | 项目类名                 |
| renderItem       | (item: DndItem<I>) => ReactNode     | -    | -      | 自定义项目渲染           |
| renderListHeader | (list: ListItem<T, I>) => ReactNode | -    | -      | 自定义列表标题渲染       |
| enableListDrag   | boolean                             | -    | true   | 是否启用列表拖拽         |
| enableItemDrag   | boolean                             | -    | true   | 是否启用项目拖拽         |

### 受控 vs 非受控模式

- **受控模式**：提供 `lists` 和 `onListsChange`，组件不维护内部状态
- **非受控模式**：提供 `initialLists`，组件内部维护状态
- 不要在运行时切换模式，会触发警告

## DndList Props

| 属性         | 类型                                | 必需 | 默认值 | 描述                       |
| ------------ | ----------------------------------- | ---- | ------ | -------------------------- |
| list         | ListItem<T, I>                      | -    | -      | 受控模式：列表数据         |
| initialList  | ListItem<T, I>                      | -    | -      | 非受控模式：初始列表数据   |
| index        | number                              | -    | -      | 在看板中的索引（看板模式） |
| onListChange | (list: ListItem<T, I>) => void      | -    | -      | 受控模式：列表变化回调     |
| className    | string                              | -    | -      | 列表容器类名               |
| style        | React.CSSProperties                 | -    | -      | 列表容器样式               |
| enableDrag   | boolean                             | -    | true   | 是否启用列表拖拽           |
| itemProps    | Partial<DndItemProps>               | -    | -      | 传递给子项目的 props       |
| renderItem   | (item: DndItem<I>) => ReactNode     | -    | -      | 自定义项目渲染             |
| renderHeader | (list: ListItem<T, I>) => ReactNode | -    | -      | 自定义列表标题渲染         |

## DndItem Props

| 属性                | 类型                                        | 必需 | 默认值 | 描述                                   |
| ------------------- | ------------------------------------------- | ---- | ------ | -------------------------------------- |
| item                | DndItem<I>                                  | ✓    | -      | 项目数据                               |
| index               | number                                      | ✓    | -      | 项目索引                               |
| className           | string \| ((isDragging: boolean) => string) | -    | -      | 项目类名（支持函数）                   |
| style               | React.CSSProperties                         | -    | -      | 项目样式                               |
| enableDrag          | boolean                                     | -    | true   | 是否启用拖拽                           |
| useCustomDragHandle | boolean                                     | -    | false  | 是否使用自定义拖拽手柄                 |
| children            | (item, dragHandleProps?) => ReactNode       | ✓    | -      | 渲染函数（自定义手柄时接收第二个参数） |

## 自定义渲染示例

### 自定义项目渲染

```tsx
<DndBoard
  lists={lists}
  onListsChange={setLists}
  renderItem={(item) => (
    <div className="custom-item">
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  )}
/>
```

### 自定义列表标题

```tsx
<DndBoard
  lists={lists}
  onListsChange={setLists}
  renderListHeader={(list) => (
    <div className="custom-header">
      <h3>{list.title}</h3>
      <span>{list.items?.length || 0} 项</span>
    </div>
  )}
/>
```

### 使用自定义拖拽手柄

```tsx
<DndItem item={item} index={index} useCustomDragHandle>
  {(item, dragHandleProps) => (
    <div>
      <div {...dragHandleProps} className="drag-handle">
        ⋮⋮
      </div>
      <div>{item.content}</div>
    </div>
  )}
</DndItem>
```

## 工具函数使用

### 处理拖拽结果

```tsx
import {
  handleListDrag,
  handleItemDragWithinList,
  handleItemDragBetweenLists,
} from "react-dnd-board";

function handleDragEnd(result: DragResult) {
  if (!result.destination) return;

  if (result.type === "list") {
    // 处理列表拖拽
    const newLists = handleListDrag(
      lists,
      result.source.index,
      result.destination.index
    );
    setLists(newLists);
  } else if (result.type === "item") {
    if (result.source.droppableId === result.destination.droppableId) {
      // 同一列表内拖拽
      const newLists = handleItemDragWithinList(
        lists,
        result.source.droppableId,
        result.source.index,
        result.destination.index
      );
      setLists(newLists);
    } else {
      // 跨列表拖拽
      const newLists = handleItemDragBetweenLists(
        lists,
        result.source.droppableId,
        result.destination.droppableId,
        result.source.index,
        result.destination.index
      );
      setLists(newLists);
    }
  }
}
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
