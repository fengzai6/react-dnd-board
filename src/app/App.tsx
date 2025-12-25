import { FeatureDescription } from "./components/feature-description";
import { SectionWrapper } from "./components/section-wrapper";
import { TableOfContents } from "./components/table-of-contents";
import {
  BoardCustomRender,
  BoardExample,
  ConditionalDrag,
  DisabledItemDrag,
  DisabledListDrag,
  EmptyList,
  HorizontalListExample,
  InvalidData,
  LargeData,
  ListCustomRender,
  ListExample,
  ReadonlyMode,
  VerticalBoardExample,
} from "./examples";

const tocItems = [
  { id: "board-example", label: "看板模式", category: "基础用法" },
  { id: "list-example", label: "垂直列表", category: "基础用法" },
  { id: "horizontal-list", label: "水平列表", category: "基础用法" },
  { id: "vertical-board", label: "垂直看板", category: "基础用法" },
  { id: "board-custom", label: "自定义看板", category: "自定义渲染" },
  { id: "list-custom", label: "自定义列表", category: "自定义渲染" },
  { id: "disabled-list", label: "禁用列表拖拽", category: "拖拽控制" },
  { id: "disabled-item", label: "禁用项目拖拽", category: "拖拽控制" },
  { id: "conditional", label: "条件拖拽", category: "拖拽控制" },
  { id: "readonly", label: "只读模式", category: "拖拽控制" },
  { id: "empty-list", label: "空列表", category: "边界处理" },
  { id: "large-data", label: "大数据量", category: "边界处理" },
  { id: "invalid-data", label: "无效数据", category: "边界处理" },
];

function App() {
  return (
    <div className="rdb:min-h-screen rdb:bg-linear-to-br rdb:from-slate-50 rdb:to-slate-100">
      <div className="rdb:flex rdb:gap-6 rdb:p-6">
        {/* 侧边栏 */}
        <aside className="rdb:sticky rdb:top-6 rdb:h-fit rdb:w-64 rdb:shrink-0 rdb:space-y-4">
          <div className="rdb:rounded-lg rdb:bg-white rdb:p-4 rdb:shadow-sm">
            <h2 className="rdb:mb-3 rdb:text-sm rdb:font-semibold rdb:text-slate-800">
              组件目录
            </h2>
            <TableOfContents items={tocItems} />
          </div>
          <FeatureDescription />
        </aside>

        {/* 主内容区 */}
        <main className="rdb:min-w-0 rdb:flex-1 rdb:space-y-8">
          {/* 页面标题 */}
          <header className="rdb:rounded-lg rdb:bg-white rdb:p-6 rdb:shadow-sm">
            <h1 className="rdb:mb-1 rdb:text-2xl rdb:font-bold rdb:text-slate-800">
              拖拽组件库示例
            </h1>
            <p className="rdb:text-sm rdb:text-slate-600">
              展示 DndBoard 和 DndList 组件的各种功能特性
            </p>
          </header>

          {/* 基础用法 */}
          <SectionWrapper id="basic" title="基础用法">
            <div id="board-example">
              <BoardExample />
            </div>
            <div id="list-example">
              <ListExample />
            </div>
            <div id="horizontal-list">
              <HorizontalListExample />
            </div>
            <div id="vertical-board">
              <VerticalBoardExample />
            </div>
          </SectionWrapper>

          {/* 自定义渲染 */}
          <SectionWrapper id="custom" title="自定义渲染">
            <div id="board-custom">
              <BoardCustomRender />
            </div>
            <div id="list-custom">
              <ListCustomRender />
            </div>
          </SectionWrapper>

          {/* 拖拽控制 */}
          <SectionWrapper id="drag-control" title="拖拽控制">
            <div id="disabled-list">
              <DisabledListDrag />
            </div>
            <div id="disabled-item">
              <DisabledItemDrag />
            </div>
            <div id="conditional">
              <ConditionalDrag />
            </div>
            <div id="readonly">
              <ReadonlyMode />
            </div>
          </SectionWrapper>

          {/* 边界处理 */}
          <SectionWrapper id="edge" title="边界处理">
            <div id="empty-list">
              <EmptyList />
            </div>
            <div id="large-data">
              <LargeData />
            </div>
            <div id="invalid-data">
              <InvalidData />
            </div>
          </SectionWrapper>
        </main>
      </div>
    </div>
  );
}

export default App;
