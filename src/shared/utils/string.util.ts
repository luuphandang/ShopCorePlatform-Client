import { customAlphabet } from 'nanoid';
import slugify from 'slugify';

import { User } from '@/graphql/@types/graphql.type';

export class StringUtil {
  static slugify(value: string): string {
    return slugify(value, { trim: true, lower: true });
  }

  static capitalize(str: string) {
    if (!str) return '';
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  static getPlainHtml(str: string) {
    return str.replace(/[^<]*([<][^>]*[>][^<]*[<][^>]*[>])[^<]*/g, '$1');
  }

  static getFirstLetters(sentence: string): string {
    if (!sentence) return '';
    return sentence
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }

  static getFullName(user: User | null) {
    if (!user) return '';

    return [user.first_name, user.last_name].filter(Boolean).join(' ');
  }

  static generateCode(prefix: string): string {
    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomPart = nanoid();

    return `${prefix}-${timestamp}${randomPart}`;
  }

  static checkNull(value?: string | null) {
    return ['null', 'undefined', ''].includes((value ?? '').trim());
  }

  static isSubsequenceInString(mainStr: string = '', checkStr: string = '') {
    const words = checkStr.trim().split(/\s+/);
    const pattern = words.map((w) => `\\b${w}\\b`).join('.*?');
    const regex = new RegExp(pattern, 'i');

    return regex.test(mainStr);
  }

  static errorMessage({ error, message }: { error?: unknown; message?: string }) {
    if (error instanceof Error) return error.message;

    return message ?? 'Đã xảy ra lỗi, vui lòng thử lại sau hoặc liên hệ với quản trị viên';
  }
}
