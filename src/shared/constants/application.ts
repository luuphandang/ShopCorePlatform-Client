export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || '';
export const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || '';

export const GOOGLE_VERIFY_TOKEN = process.env.NEXT_PUBLIC_GOOGLE_VERIFY_TOKEN || '';

export const STORE_USER_KEY = 'user';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 24;

export const SKELETON_COUNT = 6;

export const NO_IMAGE_URL = 'https://photocopy99.hcm.ss.bfcplatform.vn/production/no-image.png';

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png',
];
export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
export const ALLOWED_FILE_SIZE = 100 * 1024 * 1024;
