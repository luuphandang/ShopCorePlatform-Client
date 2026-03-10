import { CookieOption, MetadataResponse } from '@/graphql/@types/graphql.type';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/shared/constants/application';

export const defaultMetadata = (): MetadataResponse => {
  return {
    current_page: DEFAULT_PAGE,
    page_size: DEFAULT_PAGE_SIZE,
    total_items: 0,
    total_pages: 0,
  };
};

export const convertCookieOptions = (options: CookieOption) => {
  const validSameSiteValues = ['strict', 'none', 'lax'] as const;
  const sameSite =
    options.sameSite &&
    validSameSiteValues.includes(options.sameSite as (typeof validSameSiteValues)[number])
      ? (options.sameSite as 'strict' | 'none' | 'lax')
      : 'strict';

  return {
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? true,
    sameSite,
    path: options.path ?? '/',
    maxAge: options.maxAge ?? 0,
  };
};
