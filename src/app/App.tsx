import { FeatureDescription } from "./components/feature-description";
import { SectionWrapper } from "./components/section-wrapper";
import { TableOfContents } from "./components/table-of-contents";
import {
  ConditionalDragExample,
  ControlledBoardExample,
  ControlledListExample,
  CustomRenderExample,
  DisabledDragExample,
  EmptyListExample,
  InvalidDataExample,
  LargeDataExample,
  MultiListExample,
  UncontrolledBoardExample,
  UncontrolledListExample,
} from "./examples";

const tocItems = [
  { id: "controlled-board", label: "受控模式 - Board", category: "基础功能" },
  {
    id: "uncontrolled-board",
    label: "非受控模式 - Board",
    category: "基础功能",
  },
  { id: "controlled-list", label: "受控模式 - List", category: "基础功能" },
  {
    id: "uncontrolled-list",
    label: "非受控模式 - List",
    category: "基础功能",
  },
  { id: "custom-render", label: "自定义渲染", category: "高级功能" },
  { id: "disabled-drag", label: "禁用拖拽", category: "高级功能" },
  { id: "conditional-drag", label: "条件拖拽", category: "高级功能" },
  { id: "multi-list", label: "多列表交互", category: "高级功能" },
  { id: "empty-list", label: "空列表", category: "边界情况" },
  { id: "invalid-data", label: "无效数据", category: "边界情况" },
  { id: "large-data", label: "大数据量", category: "边界情况" },
];

function App() {
  return (
    <div className="rdb:min-h-screen rdb:bg-linear-to-br rdb:from-slate-50 rdb:to-slate-100">
      <div className="rdb:flex rdb:gap-6 rdb:p-6">
        {/* 侧边栏 - 组件目录 */}
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

          {/* 基础功能示例 */}
          <SectionWrapper id="basic" title="基础功能">
            <div id="controlled-board">
              <ControlledBoardExample />
            </div>
            <div id="uncontrolled-board">
              <UncontrolledBoardExample />
            </div>
            <div id="controlled-list">
              <ControlledListExample />
            </div>
            <div id="uncontrolled-list">
              <UncontrolledListExample />
            </div>
          </SectionWrapper>

          {/* 高级功能示例 */}
          <SectionWrapper id="advanced" title="高级功能">
            <div id="custom-render">
              <CustomRenderExample />
            </div>
            <div id="disabled-drag">
              <DisabledDragExample />
            </div>
            <div id="conditional-drag">
              <ConditionalDragExample />
            </div>
            <div id="multi-list">
              <MultiListExample />
            </div>
          </SectionWrapper>

          {/* 边界情况示例 */}
          <SectionWrapper id="edge-cases" title="边界情况处理">
            <div id="empty-list">
              <EmptyListExample />
            </div>
            <div id="invalid-data">
              <InvalidDataExample />
            </div>
            <div id="large-data">
              <LargeDataExample />
            </div>
          </SectionWrapper>
        </main>
      </div>
    </div>
  );
}

export default App;
