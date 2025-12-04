export function FeatureDescription() {
  return (
    <section className="rdb:rounded-lg rdb:bg-white rdb:p-6 rdb:shadow-md">
      <h2 className="rdb:mb-4 rdb:text-xl rdb:font-semibold rdb:text-slate-800">
        功能说明
      </h2>
      <ul className="rdb:space-y-3 rdb:text-slate-600">
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span className="rdb:text-lg">✨</span>
          <span>
            <strong className="rdb:text-slate-800">拖拽任务：</strong>
            点击并拖动任务卡片，可以在同一列表内重新排序，或移动到其他列表
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span className="rdb:text-lg">📋</span>
          <span>
            <strong className="rdb:text-slate-800">拖拽列表：</strong>
            点击并拖动列表标题区域，可以重新排列列表顺序
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span className="rdb:text-lg">🎨</span>
          <span>
            <strong className="rdb:text-slate-800">视觉反馈：</strong>
            拖拽过程中会显示阴影和透明度变化，提供清晰的视觉反馈
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span className="rdb:text-lg">🔧</span>
          <span>
            <strong className="rdb:text-slate-800">灵活配置：</strong>
            支持受控和非受控模式，可自定义渲染函数，可禁用拖拽功能
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span className="rdb:text-lg">⚠️</span>
          <span>
            <strong className="rdb:text-slate-800">错误处理：</strong>
            自动验证数据完整性，过滤无效项目，并提供友好的错误提示
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span className="rdb:text-lg">⚡</span>
          <span>
            <strong className="rdb:text-slate-800">性能优化：</strong>
            支持大数据量渲染，使用 React Compiler 自动优化性能
          </span>
        </li>
      </ul>
    </section>
  );
}
