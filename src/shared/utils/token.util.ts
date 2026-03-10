import jwt, { JwtPayload } from 'jsonwebtoken';

import { StringUtil } from './string.util';

export class TokenUtil {
  static tokenPayload(token: string): JwtPayload | null {
    const payload = this.decode(token);
    if (!payload) return null;

    return payload;
  }

  static isValid(token?: string): boolean {
    if (!token || StringUtil.checkNull(token)) return false;

    const payload = this.decode(token);
    if (!payload) return false;

    return !this.isExpired(token);
  }

  private static decode(token?: string): JwtPayload | null {
    if (!token || StringUtil.checkNull(token)) return null;

    try {
      const decoded = jwt.decode(token);
      if (typeof decoded === 'object' && decoded !== null) return decoded as JwtPayload;

      return null;
    } catch {
      return null;
    }
  }

  private static isExpired(token?: string): boolean {
    if (!token || StringUtil.checkNull(token)) return true;

    const decoded = this.decode(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }
}
