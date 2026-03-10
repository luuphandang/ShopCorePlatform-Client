export class NumberUtil {
  static formatCurrency(value?: number, options?: { currency?: string; locale?: string }) {
    if (!value) value = 0;

    return new Intl.NumberFormat(options?.locale || 'vi-VN', {
      style: 'currency',
      currency: options?.currency || 'VND',
    }).format(value);
  }

  static round(value?: number, precision: number = 2) {
    if (!value) return 0;

    return Math.round(value * 10 ** precision) / 10 ** precision;
  }
}
