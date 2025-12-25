import { cn } from "@/shared/utils/cn";

export interface ErrorDisplayProps {
  error: string;
  /** 错误标题，默认为 "数据验证" */
  title?: string;
  className?: string;
}

export const ErrorDisplay = ({
  error,
  title = "数据验证",
  className,
}: ErrorDisplayProps) => {
  return (
    <div
      className={cn(
        "rdb:rounded-lg rdb:border rdb:border-red-300 rdb:bg-red-50 rdb:p-4 rdb:shadow-sm",
        className,
      )}
    >
      <div className="rdb:flex rdb:items-start rdb:gap-3">
        <div className="rdb:shrink-0">
          <svg
            className="rdb:h-5 rdb:w-5 rdb:text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="rdb:flex-1">
          <h3 className="rdb:text-sm rdb:font-medium rdb:text-red-800">
            {title}错误
          </h3>
          <p className="rdb:mt-1 rdb:text-sm rdb:text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );
};
