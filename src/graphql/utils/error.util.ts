export function handleError(error: unknown): string {
  if (error && typeof error === 'object' && 'cause' in error) {
    const errorMessage = (error as { cause?: { result?: unknown } }).cause?.result;
    if (errorMessage && typeof errorMessage === 'string') {
      return errorMessage;
    }
    return 'Lỗi không xác định, vui lòng liên hệ quản trị viên!';
  } else {
    return (
      (error as { message?: string }).message ||
      'Lỗi không xác định, vui lòng liên hệ quản trị viên!'
    );
  }
}
