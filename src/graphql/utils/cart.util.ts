import { StringUtil } from '@/shared/utils/string.util';

export class CartUtil {
  private static readonly CART_CODE_KEY = 'cart_code';
  private static readonly CART_CODE_PREFIX = 'CART';

  static initializeCartCode() {
    if (!this.isLocalStorageAvailable()) {
      return this.generateCartCode();
    }

    const localCartCode = this.getCartCode;
    if (localCartCode && !StringUtil.checkNull(localCartCode)) return localCartCode;

    const newCode = this.generateCartCode();
    this.setCartCode(newCode);
    return newCode;
  }

  static renewCartCode() {
    this.clearCartCode();

    const newCode = this.generateCartCode();
    this.setCartCode(newCode);
    return newCode;
  }

  static get getCartCode() {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }
    return localStorage.getItem(this.CART_CODE_KEY);
  }

  private static generateCartCode() {
    return StringUtil.generateCode(this.CART_CODE_PREFIX);
  }

  private static setCartCode(cartCode: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.CART_CODE_KEY, cartCode);
    }
  }

  private static isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch {
      return false;
    }
  }

  private static clearCartCode() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.CART_CODE_KEY);
    }
  }
}
