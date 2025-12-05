export function FeatureDescription() {
  return (
    <div className="rdb:rounded-lg rdb:bg-white rdb:p-4 rdb:shadow-sm">
      <h2 className="rdb:mb-3 rdb:text-sm rdb:font-semibold rdb:text-slate-800">
        功能说明
      </h2>
      <ul className="rdb:space-y-2 rdb:text-xs rdb:text-slate-600">
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span>✨</span>
          <span>
            <strong className="rdb:text-slate-800">拖拽任务：</strong>
            在列表内重新排序或移动到其他列表
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span>📋</span>
          <span>
            <strong className="rdb:text-slate-800">拖拽列表：</strong>
            拖动标题区域重新排列列表顺序
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span>🎨</span>
          <span>
            <strong className="rdb:text-slate-800">视觉反馈：</strong>
            拖拽时显示阴影和透明度变化
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span>🔧</span>
          <span>
            <strong className="rdb:text-slate-800">灵活配置：</strong>
            支持受控/非受控模式和自定义渲染
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span>⚠️</span>
          <span>
            <strong className="rdb:text-slate-800">错误处理：</strong>
            自动验证数据并提供友好提示
          </span>
        </li>
        <li className="rdb:flex rdb:items-start rdb:gap-2">
          <span>⚡</span>
          <span>
            <strong className="rdb:text-slate-800">性能优化：</strong>
            支持大数据量和自动性能优化
          </span>
        </li>
      </ul>
    </div>
  );
}
