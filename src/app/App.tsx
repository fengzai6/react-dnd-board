import { FeatureDescription } from "./components/FeatureDescription";
import {
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

function App() {
  return (
    <div className="rdb:min-h-screen rdb:bg-linear-to-br rdb:from-slate-50 rdb:to-slate-100 rdb:p-8">
      <div className="rdb:mx-auto rdb:max-w-7xl rdb:space-y-12">
        {/* 页面标题 */}
        <header className="rdb:text-center">
          <h1 className="rdb:mb-2 rdb:text-4xl rdb:font-bold rdb:text-slate-800">
            拖拽组件库示例
          </h1>
          <p className="rdb:text-lg rdb:text-slate-600">
            展示 DndBoard 和 DndList 组件的各种功能特性
          </p>
        </header>

        {/* 基础功能示例 */}
        <section className="rdb:space-y-12">
          <div className="rdb:rounded-lg rdb:bg-white rdb:p-6 rdb:shadow-md">
            <h2 className="rdb:mb-2 rdb:text-2xl rdb:font-bold rdb:text-slate-800">
              基础功能
            </h2>
            <p className="rdb:text-slate-600">受控模式和非受控模式的使用示例</p>
          </div>

          <ControlledBoardExample />
          <UncontrolledBoardExample />
          <ControlledListExample />
          <UncontrolledListExample />
        </section>

        {/* 高级功能示例 */}
        <section className="rdb:space-y-12">
          <div className="rdb:rounded-lg rdb:bg-white rdb:p-6 rdb:shadow-md">
            <h2 className="rdb:mb-2 rdb:text-2xl rdb:font-bold rdb:text-slate-800">
              高级功能
            </h2>
            <p className="rdb:text-slate-600">
              自定义渲染、禁用拖拽、多列表交互等高级特性
            </p>
          </div>

          <CustomRenderExample />
          <DisabledDragExample />
          <MultiListExample />
        </section>

        {/* 边界情况示例 */}
        <section className="rdb:space-y-12">
          <div className="rdb:rounded-lg rdb:bg-white rdb:p-6 rdb:shadow-md">
            <h2 className="rdb:mb-2 rdb:text-2xl rdb:font-bold rdb:text-slate-800">
              边界情况处理
            </h2>
            <p className="rdb:text-slate-600">
              空列表、无效数据、大数据量等边界情况的处理
            </p>
          </div>

          <EmptyListExample />
          <InvalidDataExample />
          <LargeDataExample />
        </section>

        {/* 功能说明 */}
        <FeatureDescription />
      </div>
    </div>
  );
}

export default App;
