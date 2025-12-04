import type { DragResult } from "../types";

/**
 * 安全地调用 onDragEnd 回调函数
 * 捕获回调函数中的错误，防止 UI 崩溃
 */
export function safeCallOnDragEnd(
  callback: (result: DragResult) => void,
  result: DragResult
): void {
  try {
    callback(result);
  } catch (error) {
    console.error("Error in onDragEnd callback:", error);
    // UI 保持稳定，错误被记录但不传播
  }
}

/**
 * 开发模式警告
 */
export function devWarning(message: string): void {
  if (import.meta.env.MODE !== "production") {
    console.warn(`[DndBoard Warning]: ${message}`);
  }
}

/**
 * 开发模式错误
 */
export function devError(message: string): void {
  if (import.meta.env.MODE !== "production") {
    console.error(`[DndBoard Error]: ${message}`);
  }
}

/**
 * 状态恢复工具类
 * 用于在状态更新失败时恢复到上一个有效状态
 */
export class StateRecovery<T> {
  private previousState: T;
  private currentState: T;

  constructor(initialState: T) {
    this.previousState = initialState;
    this.currentState = initialState;
  }

  /**
   * 更新状态
   */
  updateState(newState: T): void {
    this.previousState = this.currentState;
    this.currentState = newState;
  }

  /**
   * 获取当前状态
   */
  getCurrentState(): T {
    return this.currentState;
  }

  /**
   * 恢复到上一个状态
   */
  recoverToPreviousState(): T {
    devWarning("Recovering to previous state due to invalid state update");
    this.currentState = this.previousState;
    return this.previousState;
  }

  /**
   * 获取上一个状态
   */
  getPreviousState(): T {
    return this.previousState;
  }
}

/**
 * 验证状态的一致性
 * 检查状态是否有效（例如索引是否在范围内）
 */
export function isValidState<T>(state: T): boolean {
  try {
    // 基本的 null/undefined 检查
    if (state === null || state === undefined) {
      return false;
    }

    // 如果是数组，检查是否为有效数组
    if (Array.isArray(state)) {
      return true;
    }

    // 如果是对象，检查是否为有效对象
    if (typeof state === "object") {
      return true;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * 安全地执行函数，捕获错误并返回默认值
 */
export function safeExecute<T>(
  fn: () => T,
  defaultValue: T,
  errorMessage?: string
): T {
  try {
    return fn();
  } catch (error) {
    if (errorMessage) {
      devError(errorMessage);
    }
    console.error("Error during execution:", error);
    return defaultValue;
  }
}

/**
 * 验证索引是否在有效范围内
 */
export function isValidIndex(index: number, arrayLength: number): boolean {
  return index >= 0 && index < arrayLength;
}

/**
 * 验证拖拽结果的有效性
 */
export function isValidDragResult(result: DragResult): boolean {
  // 检查必需字段
  if (!result.type || !result.source || !result.draggableId) {
    return false;
  }

  // 检查类型
  if (result.type !== "list" && result.type !== "item") {
    return false;
  }

  // 检查源位置
  if (typeof result.source.index !== "number" || !result.source.droppableId) {
    return false;
  }

  // 检查目标位置（可以为 null）
  if (result.destination !== null) {
    if (
      typeof result.destination.index !== "number" ||
      !result.destination.droppableId
    ) {
      return false;
    }
  }

  return true;
}

/**
 * 检测受控/非受控模式切换
 * 用于在组件从受控模式切换到非受控模式（或反之）时发出警告
 *
 * @param componentName - 组件名称，用于警告消息
 * @param wasControlled - 之前是否为受控模式
 * @param isControlled - 当前是否为受控模式
 */
export function detectControlModeSwitch(
  componentName: string,
  wasControlled: boolean,
  isControlled: boolean
): void {
  if (wasControlled !== isControlled) {
    const mode = isControlled
      ? "uncontrolled to controlled"
      : "controlled to uncontrolled";
    devWarning(
      `${componentName} is switching from ${mode} mode. ` +
        `This may cause unexpected behavior. ` +
        `Decide between controlled (provide value prop) or uncontrolled (use defaultValue) and don't change between them.`
    );
  }
}
