export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
  JSON: { input: string; output: string };
};

export type AddToCartInput = {
  conversion_unit_id: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  product_id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  variant_id: Scalars['Int']['input'];
};

/** address */
export type Address = {
  __typename?: 'Address';
  address: Scalars['String']['output'];
  code: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_default?: Maybe<Scalars['Boolean']['output']>;
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  postal_code?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  ward?: Maybe<Scalars['String']['output']>;
};

export type AdminSignedUrlInput = {
  entity: EFileEntity;
  file_name: Scalars['String']['input'];
  file_type: Scalars['String']['input'];
  owner_by?: InputMaybe<Scalars['Float']['input']>;
};

/** appointment */
export type Appointment = {
  __typename?: 'Appointment';
  attachment_ids?: Maybe<Array<Scalars['Int']['output']>>;
  attachments?: Maybe<Array<FileUpload>>;
  code: Scalars['String']['output'];
  content: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  customer?: Maybe<User>;
  customer_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status?: Maybe<EAppointmentStatus>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

export type AssignCategoryInput = {
  children_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<AssignFileUploadInput>;
  type: ECategoryType;
};

export type AssignConversionUnitInput = {
  conversion_rate: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Int']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
  regular_price: Scalars['Int']['input'];
  sale_price: Scalars['Int']['input'];
  unit: AssignUnitInput;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  variant_id?: InputMaybe<Scalars['Int']['input']>;
};

export type AssignFileUploadInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  owner_by?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EFileStatus>;
  type: EFileType;
  url: Scalars['String']['input'];
};

export type AssignPermissionInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  label: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AssignProductAttributeInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<AssignProductAttributeValueInput>>;
};

export type AssignProductAttributeValueInput = {
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AssignProductVariantInput = {
  attributes?: InputMaybe<Array<AssignProductAttributeInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  conversion_units?: InputMaybe<Array<AssignConversionUnitInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  gallery_images?: InputMaybe<Array<AssignFileUploadInput>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EProductStatus>;
  values?: InputMaybe<Array<AssignProductAttributeValueInput>>;
};

export type AssignRoleInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
};

export type AssignUnitInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

/** blog */
export type Blog = {
  __typename?: 'Blog';
  categories?: Maybe<Array<Category>>;
  category_ids?: Maybe<Array<Scalars['Int']['output']>>;
  code: Scalars['String']['output'];
  content: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  meta_description?: Maybe<Scalars['String']['output']>;
  meta_keywords?: Maybe<Scalars['String']['output']>;
  meta_robots?: Maybe<Scalars['String']['output']>;
  meta_title?: Maybe<Scalars['String']['output']>;
  short_description?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

/** booking */
export type Booking = {
  __typename?: 'Booking';
  attachment_ids?: Maybe<Array<Scalars['Int']['output']>>;
  attachments?: Maybe<Array<FileUpload>>;
  categories?: Maybe<Array<Category>>;
  category_ids?: Maybe<Array<Scalars['Int']['output']>>;
  code: Scalars['String']['output'];
  content: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  customer?: Maybe<User>;
  customer_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  estimated_date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  product_ids?: Maybe<Array<Scalars['Int']['output']>>;
  products?: Maybe<Array<Product>>;
  status: EBookingStatus;
  type: EBookingType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

/** category */
export type Category = {
  __typename?: 'Category';
  children?: Maybe<Array<Category>>;
  children_ids?: Maybe<Array<Scalars['Int']['output']>>;
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  parent_id?: Maybe<Scalars['Int']['output']>;
  short_description?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  thumbnail?: Maybe<FileUpload>;
  thumbnail_id?: Maybe<Scalars['Int']['output']>;
  type: ECategoryType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

export type CheckoutCartInput = {
  address_id?: InputMaybe<Scalars['Int']['input']>;
  cancel_at?: InputMaybe<Scalars['DateTime']['input']>;
  completed_at?: InputMaybe<Scalars['DateTime']['input']>;
  delivery_at?: InputMaybe<Scalars['DateTime']['input']>;
  estimated_delivery_at?: InputMaybe<Scalars['DateTime']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  order_detail_id?: InputMaybe<Scalars['Int']['input']>;
  payment_method?: InputMaybe<Scalars['String']['input']>;
  pickup_at?: InputMaybe<Scalars['DateTime']['input']>;
  return_at?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<EShippingStatus>;
  to_address: Scalars['String']['input'];
  to_country?: InputMaybe<Scalars['String']['input']>;
  to_district?: InputMaybe<Scalars['String']['input']>;
  to_email?: InputMaybe<Scalars['String']['input']>;
  to_latitude?: InputMaybe<Scalars['Float']['input']>;
  to_longitude?: InputMaybe<Scalars['Float']['input']>;
  to_name: Scalars['String']['input'];
  to_phone: Scalars['String']['input'];
  to_postal_code?: InputMaybe<Scalars['String']['input']>;
  to_province?: InputMaybe<Scalars['String']['input']>;
  to_ward?: InputMaybe<Scalars['String']['input']>;
  vouchers?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** conversion unit */
export type ConversionUnit = {
  __typename?: 'ConversionUnit';
  code: Scalars['String']['output'];
  conversion_rate: Scalars['Int']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  price: Scalars['Int']['output'];
  product_id?: Maybe<Scalars['Int']['output']>;
  regular_price: Scalars['Int']['output'];
  sale_price: Scalars['Int']['output'];
  unit?: Maybe<Unit>;
  unit_id: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  variant_id?: Maybe<Scalars['Int']['output']>;
};

export type CookieOption = {
  __typename?: 'CookieOption';
  domain?: Maybe<Scalars['String']['output']>;
  httpOnly?: Maybe<Scalars['Boolean']['output']>;
  maxAge?: Maybe<Scalars['Float']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sameSite?: Maybe<Scalars['String']['output']>;
  secure?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateAddressInput = {
  address: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  is_default?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  postal_code?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  ward?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAppointmentInput = {
  attachment_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  content: Scalars['String']['input'];
  customer_id?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  product_id?: InputMaybe<Scalars['String']['input']>;
  product_name?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateBlogInput = {
  categories?: InputMaybe<Array<AssignCategoryInput>>;
  content: Scalars['String']['input'];
  meta_description?: InputMaybe<Scalars['String']['input']>;
  meta_keywords?: InputMaybe<Scalars['String']['input']>;
  meta_robots?: InputMaybe<Scalars['String']['input']>;
  meta_title?: InputMaybe<Scalars['String']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateBookingInput = {
  attachments?: InputMaybe<Array<AssignFileUploadInput>>;
  category_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  content: Scalars['String']['input'];
  customer_id?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  estimated_date?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  product_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<EBookingStatus>;
  type: EBookingType;
};

export type CreateCategoryInput = {
  children_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<AssignFileUploadInput>;
  type: ECategoryType;
};

export type CreateConversionUnitInput = {
  conversion_rate: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Int']['input'];
  product_id?: InputMaybe<Scalars['Int']['input']>;
  regular_price: Scalars['Int']['input'];
  sale_price: Scalars['Int']['input'];
  unit: AssignUnitInput;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  variant_id?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateFileUploadInput = {
  name: Scalars['String']['input'];
  owner_by?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EFileStatus>;
  type: EFileType;
  url: Scalars['String']['input'];
};

export type CreateOrderDetailInput = {
  conversion_unit_id: Scalars['Int']['input'];
  discount: Scalars['Int']['input'];
  final_cost: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  payment_status?: InputMaybe<EPaymentStatus>;
  price: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  service_fee: Scalars['Int']['input'];
  shipping_status?: InputMaybe<EShippingStatus>;
  status?: InputMaybe<EOrderStatus>;
  tax: Scalars['Int']['input'];
  total_cost: Scalars['Int']['input'];
  variant_id: Scalars['Int']['input'];
};

export type CreateOrderInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  customer_id?: InputMaybe<Scalars['Int']['input']>;
  discount?: InputMaybe<Scalars['Int']['input']>;
  final_cost?: InputMaybe<Scalars['Int']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  order_details?: InputMaybe<Array<CreateOrderDetailInput>>;
  payment_status?: InputMaybe<EPaymentStatus>;
  service_fee?: InputMaybe<Scalars['Int']['input']>;
  shipping_status?: InputMaybe<EShippingStatus>;
  status?: InputMaybe<EOrderStatus>;
  tax?: InputMaybe<Scalars['Int']['input']>;
  total_cost?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateProductAttributeInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<AssignProductAttributeValueInput>>;
};

export type CreateProductAttributeValueInput = {
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  attachments?: InputMaybe<Array<AssignFileUploadInput>>;
  attributes?: InputMaybe<Array<AssignProductAttributeInput>>;
  base_unit?: InputMaybe<AssignConversionUnitInput>;
  categories?: InputMaybe<Array<AssignCategoryInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  conversion_units?: InputMaybe<Array<AssignConversionUnitInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  gallery_images?: InputMaybe<Array<AssignFileUploadInput>>;
  name: Scalars['String']['input'];
  short_description?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EProductStatus>;
  thumbnail?: InputMaybe<AssignFileUploadInput>;
  turnaround?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<EProductType>;
  values?: InputMaybe<Array<AssignProductAttributeValueInput>>;
  variants?: InputMaybe<Array<AssignProductVariantInput>>;
};

export type CreateProductReviewInput = {
  attachment_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  content: Scalars['String']['input'];
  customer_id: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
  rate: Scalars['Int']['input'];
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissions?: InputMaybe<Array<AssignPermissionInput>>;
};

export type CreateUnitInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<AssignFileUploadInput>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  roles?: InputMaybe<Array<AssignRoleInput>>;
};

/** Enum for appointment status */
export enum EAppointmentStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rescheduled = 'RESCHEDULED',
}

/** Enum for booking status */
export enum EBookingStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rescheduled = 'RESCHEDULED',
}

/** Enum for booking type */
export enum EBookingType {
  Product = 'PRODUCT',
  Service = 'SERVICE',
}

/** Enum for category types */
export enum ECategoryType {
  Blog = 'BLOG',
  Product = 'PRODUCT',
  Service = 'SERVICE',
}

/** Enum for file upload entity */
export enum EFileEntity {
  Order = 'ORDER',
  Other = 'OTHER',
  Product = 'PRODUCT',
  User = 'USER',
  Variant = 'VARIANT',
}

/** Enum for file upload status */
export enum EFileStatus {
  Activated = 'ACTIVATED',
  Deactivated = 'DEACTIVATED',
}

/** Enum for file upload type */
export enum EFileType {
  Archive = 'ARCHIVE',
  Excel = 'EXCEL',
  Image = 'IMAGE',
  Other = 'OTHER',
  Pdf = 'PDF',
  Powerpoint = 'POWERPOINT',
  Text = 'TEXT',
  Video = 'VIDEO',
  Word = 'WORD',
}

/** Enum for order statuses */
export enum EOrderStatus {
  Cancelled = 'CANCELLED',
  Cart = 'CART',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Failed = 'FAILED',
  OnHold = 'ON_HOLD',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Shipped = 'SHIPPED',
}

/** Enum for graphql pagination types */
export enum EPaginationType {
  All = 'ALL',
  Pagination = 'PAGINATION',
}

/** Enum for payment statuses */
export enum EPaymentStatus {
  Cancelled = 'CANCELLED',
  CodCollected = 'COD_COLLECTED',
  CodFailed = 'COD_FAILED',
  CodPending = 'COD_PENDING',
  Failed = 'FAILED',
  InstallmentOngoing = 'INSTALLMENT_ONGOING',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  PartialPaid = 'PARTIAL_PAID',
  PartialRefunded = 'PARTIAL_REFUNDED',
  Refunded = 'REFUNDED',
  Unpaid = 'UNPAID',
}

/** Enum for product statuses */
export enum EProductStatus {
  Activated = 'ACTIVATED',
  Deactivated = 'DEACTIVATED',
}

/** Enum for product types */
export enum EProductType {
  Product = 'PRODUCT',
  Service = 'SERVICE',
}

/** Enum for shipping statuses */
export enum EShippingStatus {
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  InTransit = 'IN_TRANSIT',
  Lost = 'LOST',
  NotRequired = 'NOT_REQUIRED',
  Pending = 'PENDING',
  Returned = 'RETURNED',
  Shipped = 'SHIPPED',
}

/** file_upload */
export type FileUpload = {
  __typename?: 'FileUpload';
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  owner_by?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  status: EFileStatus;
  type: EFileType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  url: Scalars['String']['output'];
};

export type GetAddressType = {
  __typename?: 'GetAddressType';
  data?: Maybe<Array<Address>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetAppointmentType = {
  __typename?: 'GetAppointmentType';
  data?: Maybe<Array<Appointment>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetAttributeType = {
  __typename?: 'GetAttributeType';
  data?: Maybe<Array<ProductAttribute>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetAttributeValueType = {
  __typename?: 'GetAttributeValueType';
  data?: Maybe<Array<ProductAttributeValue>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetBlogType = {
  __typename?: 'GetBlogType';
  data?: Maybe<Array<Blog>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetBookingType = {
  __typename?: 'GetBookingType';
  data?: Maybe<Array<Booking>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetCategoryType = {
  __typename?: 'GetCategoryType';
  data?: Maybe<Array<Category>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetConversionUnitType = {
  __typename?: 'GetConversionUnitType';
  data?: Maybe<Array<ConversionUnit>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetFileUploadType = {
  __typename?: 'GetFileUploadType';
  data?: Maybe<Array<FileUpload>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetManyInput = {
  /** {key: ASC or DESC} */
  order?: InputMaybe<Scalars['JSON']['input']>;
  pagination?: InputMaybe<IPagination>;
  where?: InputMaybe<Scalars['JSON']['input']>;
};

export type GetOneInput = {
  where: Scalars['JSON']['input'];
};

export type GetOrderShippingType = {
  __typename?: 'GetOrderShippingType';
  data?: Maybe<Array<OrderShipping>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetOrderType = {
  __typename?: 'GetOrderType';
  data?: Maybe<Array<Order>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetPermissionType = {
  __typename?: 'GetPermissionType';
  data?: Maybe<Array<Permission>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetProductReviewType = {
  __typename?: 'GetProductReviewType';
  data?: Maybe<Array<ProductReview>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetProductType = {
  __typename?: 'GetProductType';
  data?: Maybe<Array<Product>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetRoleType = {
  __typename?: 'GetRoleType';
  data?: Maybe<Array<Role>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetUnitType = {
  __typename?: 'GetUnitType';
  data?: Maybe<Array<Unit>>;
  metadata?: Maybe<MetadataResponse>;
};

export type GetUserType = {
  __typename?: 'GetUserType';
  data?: Maybe<Array<User>>;
  metadata?: Maybe<MetadataResponse>;
};

export type IPagination = {
  /** Size of page */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Started from 0 */
  page?: InputMaybe<Scalars['Int']['input']>;
  /** Pagination type */
  pagination_type?: InputMaybe<EPaginationType>;
};

export type JwtWithUser = {
  __typename?: 'JwtWithUser';
  access_token: Scalars['String']['output'];
  options: CookieOption;
  user: User;
};

export type MetadataResponse = {
  __typename?: 'MetadataResponse';
  current_page?: Maybe<Scalars['Float']['output']>;
  page_size?: Maybe<Scalars['Float']['output']>;
  total_items?: Maybe<Scalars['Float']['output']>;
  total_pages?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: Order;
  adminSignedUrl: SignedUrlResponse;
  cancelledOrder?: Maybe<Order>;
  checkoutCart: Order;
  clearCart: Order;
  completedOrder?: Maybe<Order>;
  confirmedOrder?: Maybe<Order>;
  createAddress: Address;
  createAppointment: Appointment;
  createBlog: Blog;
  createBooking: Booking;
  createCart: Order;
  createCategory: Category;
  createConversionUnit: ConversionUnit;
  createFile: FileUpload;
  createOrder: Order;
  createProduct: Product;
  createProductAttribute: ProductAttribute;
  createProductAttributeValue: ProductAttributeValue;
  createReview: ProductReview;
  createRole: Role;
  createUnit: Unit;
  createUser: User;
  deleteAppointment?: Maybe<Appointment>;
  deleteBlog?: Maybe<Blog>;
  deleteBooking?: Maybe<Booking>;
  deleteCategory?: Maybe<Category>;
  deleteConversionUnit?: Maybe<ConversionUnit>;
  deleteFile?: Maybe<FileUpload>;
  deleteOrder?: Maybe<Order>;
  deleteProduct?: Maybe<Product>;
  deleteProductAttribute?: Maybe<ProductAttribute>;
  deleteProductAttributeValue?: Maybe<ProductAttributeValue>;
  deleteReview?: Maybe<ProductReview>;
  deleteRole?: Maybe<Role>;
  deleteUnit?: Maybe<Unit>;
  deleteUser?: Maybe<User>;
  inTransitOrder?: Maybe<Order>;
  processingOrder?: Maybe<Order>;
  refreshToken: JwtWithUser;
  refundedOrder?: Maybe<Order>;
  removeFromCart: Order;
  returnedOrder?: Maybe<Order>;
  shippedOrder?: Maybe<Order>;
  signIn: JwtWithUser;
  signOut: Scalars['Boolean']['output'];
  signUp: JwtWithUser;
  updateAddress: Address;
  updateAppointment: Appointment;
  updateBlog: Blog;
  updateBooking: Booking;
  updateCart: Order;
  updateCategory: Category;
  updateConversionUnit: ConversionUnit;
  updateFile: FileUpload;
  updateOrder: Order;
  updateProduct: Product;
  updateProductAttribute: ProductAttribute;
  updateProductAttributeValue: ProductAttributeValue;
  updateReview: ProductReview;
  updateRole: Role;
  updateUnit: Unit;
  updateUser: User;
  websiteSignedUrl: SignedUrlResponse;
};

export type MutationAddToCartArgs = {
  code: Scalars['String']['input'];
  data: AddToCartInput;
};

export type MutationAdminSignedUrlArgs = {
  data: AdminSignedUrlInput;
};

export type MutationCancelledOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationCheckoutCartArgs = {
  code: Scalars['String']['input'];
  data: CheckoutCartInput;
};

export type MutationClearCartArgs = {
  code: Scalars['String']['input'];
};

export type MutationCompletedOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationConfirmedOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationCreateAddressArgs = {
  data: CreateAddressInput;
};

export type MutationCreateAppointmentArgs = {
  data: CreateAppointmentInput;
};

export type MutationCreateBlogArgs = {
  data: CreateBlogInput;
};

export type MutationCreateBookingArgs = {
  data: CreateBookingInput;
};

export type MutationCreateCartArgs = {
  data: CreateOrderInput;
};

export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};

export type MutationCreateConversionUnitArgs = {
  data: CreateConversionUnitInput;
};

export type MutationCreateFileArgs = {
  data: CreateFileUploadInput;
};

export type MutationCreateOrderArgs = {
  data: CreateOrderInput;
};

export type MutationCreateProductArgs = {
  data: CreateProductInput;
};

export type MutationCreateProductAttributeArgs = {
  data: CreateProductAttributeInput;
};

export type MutationCreateProductAttributeValueArgs = {
  data: CreateProductAttributeValueInput;
};

export type MutationCreateReviewArgs = {
  data: CreateProductReviewInput;
};

export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};

export type MutationCreateUnitArgs = {
  data: CreateUnitInput;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteAppointmentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteBlogArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteBookingArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteConversionUnitArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteFileArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteProductAttributeArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteProductAttributeValueArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteReviewArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteRoleArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteUnitArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};

export type MutationInTransitOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationProcessingOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRefundedOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveFromCartArgs = {
  code: Scalars['String']['input'];
  data: RemoveFromCartInput;
};

export type MutationReturnedOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationShippedOrderArgs = {
  id: Scalars['Int']['input'];
};

export type MutationSignInArgs = {
  data: SignInInput;
};

export type MutationSignUpArgs = {
  data: SignUpInput;
};

export type MutationUpdateAddressArgs = {
  data: UpdateAddressInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateAppointmentArgs = {
  data: UpdateAppointmentInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateBlogArgs = {
  data: UpdateBlogInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateBookingArgs = {
  data: UpdateBookingInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateCartArgs = {
  code: Scalars['String']['input'];
  data: UpdateOrderInput;
};

export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateConversionUnitArgs = {
  data: UpdateConversionUnitInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateFileArgs = {
  data: UpdateFileUploadInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateOrderArgs = {
  data: UpdateOrderInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateProductAttributeArgs = {
  data: UpdateProductAttributeInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateProductAttributeValueArgs = {
  data: UpdateProductAttributeValueInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateReviewArgs = {
  data: UpdateProductReviewInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateRoleArgs = {
  data: UpdateRoleInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateUnitArgs = {
  data: UpdateUnitInput;
  id: Scalars['Int']['input'];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Int']['input'];
};

export type MutationWebsiteSignedUrlArgs = {
  data: SignedUrlInput;
};

/** order */
export type Order = {
  __typename?: 'Order';
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  customer?: Maybe<User>;
  customer_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  discount: Scalars['Int']['output'];
  final_cost: Scalars['Int']['output'];
  histories?: Maybe<Array<OrderHistory>>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  order_details?: Maybe<Array<OrderDetail>>;
  paid: Scalars['Int']['output'];
  payment_status: EPaymentStatus;
  remaining: Scalars['Int']['output'];
  service_fee: Scalars['Int']['output'];
  shipping_status: EShippingStatus;
  status: EOrderStatus;
  tax: Scalars['Int']['output'];
  total_cost: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

/** order_detail */
export type OrderDetail = {
  __typename?: 'OrderDetail';
  code: Scalars['String']['output'];
  conversion_unit?: Maybe<ConversionUnit>;
  conversion_unit_id: Scalars['Int']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  discount: Scalars['Int']['output'];
  final_cost: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  order_id: Scalars['Int']['output'];
  payment_status: EPaymentStatus;
  price: Scalars['Int']['output'];
  product?: Maybe<Product>;
  product_id: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  service_fee: Scalars['Int']['output'];
  shipping?: Maybe<OrderShipping>;
  shipping_status: EShippingStatus;
  status: EOrderStatus;
  tax: Scalars['Int']['output'];
  total_cost: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  variant?: Maybe<ProductVariant>;
  variant_id: Scalars['Int']['output'];
};

/** order_history */
export type OrderHistory = {
  __typename?: 'OrderHistory';
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  order_detail_id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  shipping_status?: Maybe<EShippingStatus>;
  status?: Maybe<EOrderStatus>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

/** order_shipping */
export type OrderShipping = {
  __typename?: 'OrderShipping';
  address_id?: Maybe<Scalars['Int']['output']>;
  cancel_at?: Maybe<Scalars['DateTime']['output']>;
  code: Scalars['String']['output'];
  completed_at?: Maybe<Scalars['DateTime']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  delivery_at?: Maybe<Scalars['DateTime']['output']>;
  estimated_delivery_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  order_detail_id: Scalars['Int']['output'];
  pickup_at?: Maybe<Scalars['DateTime']['output']>;
  return_at?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<EShippingStatus>;
  to_address: Scalars['String']['output'];
  to_country?: Maybe<Scalars['String']['output']>;
  to_district?: Maybe<Scalars['String']['output']>;
  to_email?: Maybe<Scalars['String']['output']>;
  to_latitude?: Maybe<Scalars['Float']['output']>;
  to_longitude?: Maybe<Scalars['Float']['output']>;
  to_name: Scalars['String']['output'];
  to_phone: Scalars['String']['output'];
  to_postal_code?: Maybe<Scalars['String']['output']>;
  to_province?: Maybe<Scalars['String']['output']>;
  to_ward?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

/** permission */
export type Permission = {
  __typename?: 'Permission';
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  label: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  value: Scalars['String']['output'];
};

/** product */
export type Product = {
  __typename?: 'Product';
  attachment_ids?: Maybe<Array<Scalars['Int']['output']>>;
  attachments?: Maybe<Array<FileUpload>>;
  attribute_ids?: Maybe<Array<Scalars['Int']['output']>>;
  attribute_value_ids?: Maybe<Array<Scalars['Int']['output']>>;
  attributes?: Maybe<Array<ProductAttribute>>;
  average_rating?: Maybe<Scalars['Int']['output']>;
  base_unit?: Maybe<ConversionUnit>;
  base_unit_id?: Maybe<Scalars['Int']['output']>;
  categories?: Maybe<Array<Category>>;
  category_ids?: Maybe<Array<Scalars['Int']['output']>>;
  code: Scalars['String']['output'];
  conversion_units?: Maybe<Array<ConversionUnit>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Array<Scalars['String']['output']>>;
  gallery_image_ids?: Maybe<Array<Scalars['Int']['output']>>;
  gallery_images?: Maybe<Array<FileUpload>>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  product_reviews?: Maybe<Array<ProductReview>>;
  rating_count?: Maybe<Scalars['Int']['output']>;
  short_description?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status: EProductStatus;
  thumbnail?: Maybe<FileUpload>;
  thumbnail_id?: Maybe<Scalars['Int']['output']>;
  turnaround?: Maybe<Scalars['String']['output']>;
  type: EProductType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  values?: Maybe<Array<ProductAttributeValue>>;
  variants?: Maybe<Array<ProductVariant>>;
};

/** product_attribute */
export type ProductAttribute = {
  __typename?: 'ProductAttribute';
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  values?: Maybe<Array<ProductAttributeValue>>;
};

/** product_attribute_value */
export type ProductAttributeValue = {
  __typename?: 'ProductAttributeValue';
  attribute_id: Scalars['Float']['output'];
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  value: Scalars['String']['output'];
};

/** product_review */
export type ProductReview = {
  __typename?: 'ProductReview';
  attachment_ids?: Maybe<Array<Scalars['Int']['output']>>;
  attachments?: Maybe<Array<FileUpload>>;
  code: Scalars['String']['output'];
  content: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  product_id: Scalars['Int']['output'];
  rate: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  user_id: Scalars['Int']['output'];
};

/** product_variant */
export type ProductVariant = {
  __typename?: 'ProductVariant';
  attribute_ids?: Maybe<Array<Scalars['Int']['output']>>;
  attribute_value_ids?: Maybe<Array<Scalars['Int']['output']>>;
  attributes?: Maybe<Array<ProductAttribute>>;
  base_unit?: Maybe<ConversionUnit>;
  base_unit_id?: Maybe<Scalars['Int']['output']>;
  code: Scalars['String']['output'];
  conversion_units?: Maybe<Array<ConversionUnit>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  gallery_image_ids?: Maybe<Array<Scalars['Int']['output']>>;
  gallery_images?: Maybe<Array<FileUpload>>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  product_id: Scalars['Int']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status: EProductStatus;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
  values?: Maybe<Array<ProductAttributeValue>>;
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  addresses: GetAddressType;
  appointment?: Maybe<Appointment>;
  appointments: GetAppointmentType;
  blog?: Maybe<Blog>;
  blogs: GetBlogType;
  booking?: Maybe<Booking>;
  bookings: GetBookingType;
  categories: GetCategoryType;
  category?: Maybe<Category>;
  conversionUnit?: Maybe<ConversionUnit>;
  conversionUnits: GetConversionUnitType;
  file?: Maybe<FileUpload>;
  files: GetFileUploadType;
  myAddress?: Maybe<Address>;
  myAddresses: GetAddressType;
  myAppointment?: Maybe<Appointment>;
  myAppointments: GetAppointmentType;
  myBooking?: Maybe<Booking>;
  myBookings: GetBookingType;
  myCart?: Maybe<Order>;
  myFile?: Maybe<FileUpload>;
  myFiles: GetFileUploadType;
  myOrder?: Maybe<Order>;
  myOrders: GetOrderType;
  myPermissions: GetPermissionType;
  myUser?: Maybe<User>;
  order?: Maybe<Order>;
  orders: GetOrderType;
  permission?: Maybe<Permission>;
  permissions: GetPermissionType;
  product?: Maybe<Product>;
  productAttribute?: Maybe<ProductAttribute>;
  productAttributeValue?: Maybe<ProductAttributeValue>;
  productAttributeValues: GetAttributeValueType;
  productAttributes: GetAttributeType;
  products: GetProductType;
  review?: Maybe<ProductReview>;
  reviews: GetProductReviewType;
  role?: Maybe<Role>;
  roles: GetRoleType;
  shipping?: Maybe<OrderShipping>;
  shippings: GetOrderShippingType;
  trackingOrder?: Maybe<Order>;
  unit?: Maybe<Unit>;
  units: GetUnitType;
  user?: Maybe<User>;
  users: GetUserType;
};

export type QueryAddressArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryAddressesArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryAppointmentArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryAppointmentsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryBlogArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryBlogsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryBookingArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryBookingsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryCategoriesArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryCategoryArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryConversionUnitArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryConversionUnitsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryFileArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryFilesArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryMyAddressArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryMyAddressesArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryMyAppointmentArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryMyAppointmentsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryMyBookingArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryMyBookingsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryMyCartArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryMyFileArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryMyFilesArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryMyOrderArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryMyOrdersArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryMyPermissionsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryMyUserArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryOrderArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryOrdersArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryPermissionArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryPermissionsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryProductArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryProductAttributeArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryProductAttributeValueArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryProductAttributeValuesArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryProductAttributesArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryProductsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryReviewArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryReviewsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryRoleArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryRolesArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryShippingArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryShippingsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryTrackingOrderArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryUnitArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryUnitsArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type QueryUserArgs = {
  query?: InputMaybe<GetOneInput>;
};

export type QueryUsersArgs = {
  query?: InputMaybe<GetManyInput>;
};

export type RemoveFromCartInput = {
  conversion_unit_id: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
  variant_id: Scalars['Int']['input'];
};

/** role */
export type Role = {
  __typename?: 'Role';
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  permission_ids?: Maybe<Array<Scalars['Int']['output']>>;
  permissions?: Maybe<Array<Permission>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

export type SignInInput = {
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type SignUpInput = {
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type SignedUrlInput = {
  file_name: Scalars['String']['input'];
  file_type: Scalars['String']['input'];
  owner_by?: InputMaybe<Scalars['Float']['input']>;
};

export type SignedUrlResponse = {
  __typename?: 'SignedUrlResponse';
  file_upload?: Maybe<FileUpload>;
  signed_url?: Maybe<Scalars['String']['output']>;
};

/** unit */
export type Unit = {
  __typename?: 'Unit';
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

export type UpdateAddressInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  is_default?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postal_code?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  ward?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAppointmentInput = {
  attachment_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  customer_id?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  product_id?: InputMaybe<Scalars['String']['input']>;
  product_name?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBlogInput = {
  categories?: InputMaybe<Array<AssignCategoryInput>>;
  content?: InputMaybe<Scalars['String']['input']>;
  meta_description?: InputMaybe<Scalars['String']['input']>;
  meta_keywords?: InputMaybe<Scalars['String']['input']>;
  meta_robots?: InputMaybe<Scalars['String']['input']>;
  meta_title?: InputMaybe<Scalars['String']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBookingInput = {
  attachments?: InputMaybe<Array<AssignFileUploadInput>>;
  category_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  customer_id?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  estimated_date?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  product_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<EBookingStatus>;
  type?: InputMaybe<EBookingType>;
};

export type UpdateCategoryInput = {
  children_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<AssignFileUploadInput>;
  type?: InputMaybe<ECategoryType>;
};

export type UpdateConversionUnitInput = {
  conversion_rate?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  regular_price?: InputMaybe<Scalars['Int']['input']>;
  sale_price?: InputMaybe<Scalars['Int']['input']>;
  unit?: InputMaybe<AssignUnitInput>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  variant_id?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateFileUploadInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  owner_by?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EFileStatus>;
  type?: InputMaybe<EFileType>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  customer_id?: InputMaybe<Scalars['Int']['input']>;
  discount?: InputMaybe<Scalars['Int']['input']>;
  final_cost?: InputMaybe<Scalars['Int']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  order_details?: InputMaybe<Array<CreateOrderDetailInput>>;
  payment_status?: InputMaybe<EPaymentStatus>;
  service_fee?: InputMaybe<Scalars['Int']['input']>;
  shipping_status?: InputMaybe<EShippingStatus>;
  status?: InputMaybe<EOrderStatus>;
  tax?: InputMaybe<Scalars['Int']['input']>;
  total_cost?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductAttributeInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<AssignProductAttributeValueInput>>;
};

export type UpdateProductAttributeValueInput = {
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  attachments?: InputMaybe<Array<AssignFileUploadInput>>;
  attributes?: InputMaybe<Array<AssignProductAttributeInput>>;
  base_unit?: InputMaybe<AssignConversionUnitInput>;
  categories?: InputMaybe<Array<AssignCategoryInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  conversion_units?: InputMaybe<Array<AssignConversionUnitInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  gallery_images?: InputMaybe<Array<AssignFileUploadInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EProductStatus>;
  thumbnail?: InputMaybe<AssignFileUploadInput>;
  turnaround?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<EProductType>;
  values?: InputMaybe<Array<AssignProductAttributeValueInput>>;
  variants?: InputMaybe<Array<AssignProductVariantInput>>;
};

export type UpdateProductReviewInput = {
  attachment_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  customer_id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  rate?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<AssignPermissionInput>>;
};

export type UpdateUnitInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<AssignFileUploadInput>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  confirm_password?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  new_password?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<AssignRoleInput>>;
};

/** user */
export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<FileUpload>;
  avatar_id?: Maybe<Scalars['Int']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  creator?: Maybe<User>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_by?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  last_name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role_ids?: Maybe<Array<Scalars['Int']['output']>>;
  roles?: Maybe<Array<Role>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['Int']['output']>;
  updater?: Maybe<User>;
};

export type AddressFieldsFragment = {
  __typename?: 'Address';
  name: string;
  phone: string;
  email?: string | null;
  address: string;
  is_default?: boolean | null;
  created_at?: string | null;
};

export type AppointmentFieldsFragment = {
  __typename?: 'Appointment';
  name: string;
  phone: string;
  email?: string | null;
  title: string;
  status?: EAppointmentStatus | null;
  created_at?: string | null;
};

export type BlogFieldsFragment = {
  __typename?: 'Blog';
  title: string;
  short_description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  meta_robots?: string | null;
  created_at?: string | null;
};

export type BookingFieldsFragment = {
  __typename?: 'Booking';
  customer_id?: number | null;
  name: string;
  phone: string;
  email: string;
  type: EBookingType;
  estimated_date?: string | null;
  status: EBookingStatus;
  created_at?: string | null;
};

export type CategoryFieldsFragment = {
  __typename?: 'Category';
  name: string;
  slug: string;
  type: ECategoryType;
  created_at?: string | null;
};

export type ConversionUnitFieldsFragment = {
  __typename?: 'ConversionUnit';
  product_id?: number | null;
  variant_id?: number | null;
  unit_id: number;
  conversion_rate: number;
  regular_price: number;
  sale_price: number;
  price: number;
  created_at?: string | null;
};

export type FileUploadFieldsFragment = {
  __typename?: 'FileUpload';
  name: string;
  url: string;
  created_at?: string | null;
};

export type MetadataFieldsFragment = {
  __typename?: 'MetadataResponse';
  current_page?: number | null;
  page_size?: number | null;
  total_items?: number | null;
  total_pages?: number | null;
};

export type OrderDetailFieldsFragment = {
  __typename?: 'OrderDetail';
  product_id: number;
  variant_id: number;
  conversion_unit_id: number;
  price: number;
  quantity: number;
  total_cost: number;
  service_fee: number;
  tax: number;
  discount: number;
  final_cost: number;
  status: EOrderStatus;
  shipping_status: EShippingStatus;
  payment_status: EPaymentStatus;
  created_at?: string | null;
};

export type OrderHistoryFieldsFragment = {
  __typename?: 'OrderHistory';
  status?: EOrderStatus | null;
  shipping_status?: EShippingStatus | null;
  created_at?: string | null;
};

export type OrderShippingFieldsFragment = {
  __typename?: 'OrderShipping';
  to_name: string;
  to_phone: string;
  to_address: string;
  estimated_delivery_at?: string | null;
  created_at?: string | null;
};

export type OrderFieldsFragment = {
  __typename?: 'Order';
  id: number;
  code: string;
  customer_id?: number | null;
  total_cost: number;
  service_fee: number;
  tax: number;
  discount: number;
  final_cost: number;
  paid: number;
  remaining: number;
  status: EOrderStatus;
  shipping_status: EShippingStatus;
  payment_status: EPaymentStatus;
  created_at?: string | null;
};

export type PermissionFieldsFragment = { __typename?: 'Permission'; label: string; value: string };

export type ProductAttributeValueFieldsFragment = {
  __typename?: 'ProductAttributeValue';
  attribute_id: number;
  value: string;
  created_at?: string | null;
};

export type ProductAttributeFieldsFragment = {
  __typename?: 'ProductAttribute';
  name: string;
  created_at?: string | null;
};

export type ProductVariantFieldsFragment = {
  __typename?: 'ProductVariant';
  code: string;
  name: string;
  sku?: string | null;
  created_at?: string | null;
};

export type ProductFieldsFragment = {
  __typename?: 'Product';
  code: string;
  name: string;
  sku?: string | null;
  created_at?: string | null;
};

export type RoleFieldsFragment = { __typename?: 'Role'; name: string; created_at?: string | null };

export type UnitFieldsFragment = { __typename?: 'Unit'; name: string; created_at?: string | null };

export type UserFieldsFragment = {
  __typename?: 'User';
  phone: string;
  first_name?: string | null;
  last_name: string;
  email?: string | null;
  birthday?: string | null;
  address?: string | null;
  created_at?: string | null;
};

export type CreateAppointmentMutationVariables = Exact<{
  data: CreateAppointmentInput;
}>;

export type CreateAppointmentMutation = {
  __typename?: 'Mutation';
  createAppointment: {
    __typename?: 'Appointment';
    name: string;
    phone: string;
    email?: string | null;
    title: string;
    status?: EAppointmentStatus | null;
    created_at?: string | null;
  };
};

export type UpdateAppointmentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateAppointmentInput;
}>;

export type UpdateAppointmentMutation = {
  __typename?: 'Mutation';
  updateAppointment: {
    __typename?: 'Appointment';
    name: string;
    phone: string;
    email?: string | null;
    title: string;
    status?: EAppointmentStatus | null;
    created_at?: string | null;
  };
};

export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: {
    __typename?: 'JwtWithUser';
    access_token: string;
    options: {
      __typename?: 'CookieOption';
      httpOnly?: boolean | null;
      secure?: boolean | null;
      sameSite?: string | null;
      path?: string | null;
      maxAge?: number | null;
      domain?: string | null;
    };
    user: {
      __typename?: 'User';
      id: number;
      code: string;
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
      avatar?: {
        __typename?: 'FileUpload';
        name: string;
        url: string;
        created_at?: string | null;
      } | null;
    };
  };
};

export type SignInMutationVariables = Exact<{
  data: SignInInput;
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn: {
    __typename?: 'JwtWithUser';
    access_token: string;
    options: {
      __typename?: 'CookieOption';
      httpOnly?: boolean | null;
      secure?: boolean | null;
      sameSite?: string | null;
      path?: string | null;
      maxAge?: number | null;
      domain?: string | null;
    };
    user: {
      __typename?: 'User';
      id: number;
      code: string;
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
      avatar?: {
        __typename?: 'FileUpload';
        name: string;
        url: string;
        created_at?: string | null;
      } | null;
    };
  };
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation'; signOut: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = {
  __typename?: 'Mutation';
  refreshToken: {
    __typename?: 'JwtWithUser';
    access_token: string;
    options: {
      __typename?: 'CookieOption';
      httpOnly?: boolean | null;
      secure?: boolean | null;
      sameSite?: string | null;
      path?: string | null;
      maxAge?: number | null;
      domain?: string | null;
    };
    user: {
      __typename?: 'User';
      id: number;
      code: string;
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
      avatar?: {
        __typename?: 'FileUpload';
        name: string;
        url: string;
        created_at?: string | null;
      } | null;
    };
  };
};

export type CreateBookingMutationVariables = Exact<{
  data: CreateBookingInput;
}>;

export type CreateBookingMutation = {
  __typename?: 'Mutation';
  createBooking: {
    __typename?: 'Booking';
    category_ids?: Array<number> | null;
    product_ids?: Array<number> | null;
    attachment_ids?: Array<number> | null;
    customer_id?: number | null;
    name: string;
    phone: string;
    email: string;
    type: EBookingType;
    estimated_date?: string | null;
    status: EBookingStatus;
    created_at?: string | null;
  };
};

export type CreateCartMutationVariables = Exact<{
  data: CreateOrderInput;
}>;

export type CreateCartMutation = {
  __typename?: 'Mutation';
  createCart: {
    __typename?: 'Order';
    id: number;
    code: string;
    note?: string | null;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      id: number;
      code: string;
      order_id: number;
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      note?: string | null;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
      product?: {
        __typename?: 'Product';
        id: number;
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
        thumbnail?: {
          __typename?: 'FileUpload';
          id: number;
          code: string;
          name: string;
          url: string;
          created_at?: string | null;
        } | null;
      } | null;
      variant?: {
        __typename?: 'ProductVariant';
        id: number;
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      conversion_unit?: {
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      } | null;
      shipping?: {
        __typename?: 'OrderShipping';
        id: number;
        code: string;
        to_name: string;
        to_phone: string;
        to_address: string;
        estimated_delivery_at?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    histories?: Array<{
      __typename?: 'OrderHistory';
      id: number;
      code: string;
      status?: EOrderStatus | null;
      shipping_status?: EShippingStatus | null;
      created_at?: string | null;
    }> | null;
    customer?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  };
};

export type UpdateCartMutationVariables = Exact<{
  code: Scalars['String']['input'];
  data: UpdateOrderInput;
}>;

export type UpdateCartMutation = {
  __typename?: 'Mutation';
  updateCart: {
    __typename?: 'Order';
    id: number;
    code: string;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
      product?: {
        __typename?: 'Product';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      variant?: {
        __typename?: 'ProductVariant';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      conversion_unit?: {
        __typename?: 'ConversionUnit';
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
      } | null;
    }> | null;
  };
};

export type AddToCartMutationVariables = Exact<{
  code: Scalars['String']['input'];
  data: AddToCartInput;
}>;

export type AddToCartMutation = {
  __typename?: 'Mutation';
  addToCart: {
    __typename?: 'Order';
    id: number;
    code: string;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
      product?: {
        __typename?: 'Product';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      variant?: {
        __typename?: 'ProductVariant';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      conversion_unit?: {
        __typename?: 'ConversionUnit';
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
      } | null;
    }> | null;
  };
};

export type RemoveFromCartMutationVariables = Exact<{
  code: Scalars['String']['input'];
  data: RemoveFromCartInput;
}>;

export type RemoveFromCartMutation = {
  __typename?: 'Mutation';
  removeFromCart: {
    __typename?: 'Order';
    id: number;
    code: string;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
      product?: {
        __typename?: 'Product';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      variant?: {
        __typename?: 'ProductVariant';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      conversion_unit?: {
        __typename?: 'ConversionUnit';
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
      } | null;
    }> | null;
  };
};

export type ClearCartMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;

export type ClearCartMutation = {
  __typename?: 'Mutation';
  clearCart: {
    __typename?: 'Order';
    id: number;
    code: string;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
      product?: {
        __typename?: 'Product';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      variant?: {
        __typename?: 'ProductVariant';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      conversion_unit?: {
        __typename?: 'ConversionUnit';
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
      } | null;
    }> | null;
  };
};

export type CheckoutCartMutationVariables = Exact<{
  code: Scalars['String']['input'];
  data: CheckoutCartInput;
}>;

export type CheckoutCartMutation = {
  __typename?: 'Mutation';
  checkoutCart: {
    __typename?: 'Order';
    id: number;
    code: string;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  data: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Category';
    name: string;
    slug: string;
    type: ECategoryType;
    created_at?: string | null;
  };
};

export type CreateConversionUnitMutationVariables = Exact<{
  data: CreateConversionUnitInput;
}>;

export type CreateConversionUnitMutation = {
  __typename?: 'Mutation';
  createConversionUnit: {
    __typename?: 'ConversionUnit';
    product_id?: number | null;
    variant_id?: number | null;
    unit_id: number;
    conversion_rate: number;
    regular_price: number;
    sale_price: number;
    price: number;
    created_at?: string | null;
    unit?: { __typename?: 'Unit'; id: number; name: string; created_at?: string | null } | null;
  };
};

export type UpdateConversionUnitMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateConversionUnitInput;
}>;

export type UpdateConversionUnitMutation = {
  __typename?: 'Mutation';
  updateConversionUnit: {
    __typename?: 'ConversionUnit';
    product_id?: number | null;
    variant_id?: number | null;
    unit_id: number;
    conversion_rate: number;
    regular_price: number;
    sale_price: number;
    price: number;
    created_at?: string | null;
    unit?: { __typename?: 'Unit'; id: number; name: string; created_at?: string | null } | null;
  };
};

export type WebsiteSignedUrlMutationVariables = Exact<{
  data: SignedUrlInput;
}>;

export type WebsiteSignedUrlMutation = {
  __typename?: 'Mutation';
  websiteSignedUrl: {
    __typename?: 'SignedUrlResponse';
    signed_url?: string | null;
    file_upload?: {
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
  };
};

export type CreateFileMutationVariables = Exact<{
  data: CreateFileUploadInput;
}>;

export type CreateFileMutation = {
  __typename?: 'Mutation';
  createFile: { __typename?: 'FileUpload'; name: string; url: string; created_at?: string | null };
};

export type UpdateFileMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateFileUploadInput;
}>;

export type UpdateFileMutation = {
  __typename?: 'Mutation';
  updateFile: {
    __typename?: 'FileUpload';
    id: number;
    code: string;
    slug: string;
    type: EFileType;
    status: EFileStatus;
    owner_by?: number | null;
    name: string;
    url: string;
    created_at?: string | null;
  };
};

export type CreateOrderMutationVariables = Exact<{
  data: CreateOrderInput;
}>;

export type CreateOrderMutation = {
  __typename?: 'Mutation';
  createOrder: {
    __typename?: 'Order';
    id: number;
    code: string;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
    }> | null;
  };
};

export type UpdateOrderMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateOrderInput;
}>;

export type UpdateOrderMutation = {
  __typename?: 'Mutation';
  updateOrder: {
    __typename?: 'Order';
    id: number;
    code: string;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
    }> | null;
  };
};

export type CreateProductAttributeValueMutationVariables = Exact<{
  data: CreateProductAttributeValueInput;
}>;

export type CreateProductAttributeValueMutation = {
  __typename?: 'Mutation';
  createProductAttributeValue: {
    __typename?: 'ProductAttributeValue';
    attribute_id: number;
    value: string;
    created_at?: string | null;
  };
};

export type UpdateProductAttributeValueMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateProductAttributeValueInput;
}>;

export type UpdateProductAttributeValueMutation = {
  __typename?: 'Mutation';
  updateProductAttributeValue: {
    __typename?: 'ProductAttributeValue';
    attribute_id: number;
    value: string;
    created_at?: string | null;
  };
};

export type CreateProductAttributeMutationVariables = Exact<{
  data: CreateProductAttributeInput;
}>;

export type CreateProductAttributeMutation = {
  __typename?: 'Mutation';
  createProductAttribute: {
    __typename?: 'ProductAttribute';
    name: string;
    created_at?: string | null;
  };
};

export type UpdateProductAttributeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateProductAttributeInput;
}>;

export type UpdateProductAttributeMutation = {
  __typename?: 'Mutation';
  updateProductAttribute: {
    __typename?: 'ProductAttribute';
    name: string;
    created_at?: string | null;
  };
};

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'Product';
    id: number;
    code: string;
    slug?: string | null;
    sku?: string | null;
    type: EProductType;
    features?: Array<string> | null;
    turnaround?: string | null;
    short_description?: string | null;
    description?: string | null;
    status: EProductStatus;
    likes?: number | null;
    average_rating?: number | null;
    rating_count?: number | null;
    updated_at?: string | null;
    name: string;
    created_at?: string | null;
    thumbnail?: {
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
    gallery_images?: Array<{
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    }> | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      code: string;
      name: string;
      slug: string;
      type: ECategoryType;
      created_at?: string | null;
    }> | null;
    base_unit?: {
      __typename?: 'ConversionUnit';
      id: number;
      code: string;
      product_id?: number | null;
      variant_id?: number | null;
      unit_id: number;
      conversion_rate: number;
      regular_price: number;
      sale_price: number;
      price: number;
      created_at?: string | null;
      unit?: {
        __typename?: 'Unit';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
      } | null;
    } | null;
    conversion_units?: Array<{
      __typename?: 'ConversionUnit';
      id: number;
      code: string;
      product_id?: number | null;
      variant_id?: number | null;
      unit_id: number;
      conversion_rate: number;
      regular_price: number;
      sale_price: number;
      price: number;
      created_at?: string | null;
      unit?: {
        __typename?: 'Unit';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
      } | null;
    }> | null;
    attributes?: Array<{
      __typename?: 'ProductAttribute';
      id: number;
      code: string;
      name: string;
      created_at?: string | null;
      values?: Array<{
        __typename?: 'ProductAttributeValue';
        id: number;
        code: string;
        attribute_id: number;
        value: string;
        created_at?: string | null;
      }> | null;
    }> | null;
    values?: Array<{
      __typename?: 'ProductAttributeValue';
      id: number;
      code: string;
      attribute_id: number;
      value: string;
      created_at?: string | null;
    }> | null;
    variants?: Array<{
      __typename?: 'ProductVariant';
      id: number;
      code: string;
      status: EProductStatus;
      name: string;
      sku?: string | null;
      created_at?: string | null;
      attributes?: Array<{
        __typename?: 'ProductAttribute';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
        values?: Array<{
          __typename?: 'ProductAttributeValue';
          id: number;
          code: string;
          attribute_id: number;
          value: string;
          created_at?: string | null;
        }> | null;
      }> | null;
      values?: Array<{
        __typename?: 'ProductAttributeValue';
        id: number;
        code: string;
        attribute_id: number;
        value: string;
        created_at?: string | null;
      }> | null;
      base_unit?: {
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      } | null;
      conversion_units?: Array<{
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      }> | null;
    }> | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  };
};

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: {
    __typename?: 'Product';
    id: number;
    code: string;
    slug?: string | null;
    sku?: string | null;
    type: EProductType;
    features?: Array<string> | null;
    turnaround?: string | null;
    short_description?: string | null;
    description?: string | null;
    status: EProductStatus;
    likes?: number | null;
    average_rating?: number | null;
    rating_count?: number | null;
    updated_at?: string | null;
    name: string;
    created_at?: string | null;
    thumbnail?: {
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
    gallery_images?: Array<{
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    }> | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      code: string;
      name: string;
      slug: string;
      type: ECategoryType;
      created_at?: string | null;
    }> | null;
    base_unit?: {
      __typename?: 'ConversionUnit';
      id: number;
      code: string;
      product_id?: number | null;
      variant_id?: number | null;
      unit_id: number;
      conversion_rate: number;
      regular_price: number;
      sale_price: number;
      price: number;
      created_at?: string | null;
      unit?: {
        __typename?: 'Unit';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
      } | null;
    } | null;
    conversion_units?: Array<{
      __typename?: 'ConversionUnit';
      id: number;
      code: string;
      product_id?: number | null;
      variant_id?: number | null;
      unit_id: number;
      conversion_rate: number;
      regular_price: number;
      sale_price: number;
      price: number;
      created_at?: string | null;
      unit?: {
        __typename?: 'Unit';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
      } | null;
    }> | null;
    attributes?: Array<{
      __typename?: 'ProductAttribute';
      id: number;
      code: string;
      name: string;
      created_at?: string | null;
      values?: Array<{
        __typename?: 'ProductAttributeValue';
        id: number;
        code: string;
        attribute_id: number;
        value: string;
        created_at?: string | null;
      }> | null;
    }> | null;
    values?: Array<{
      __typename?: 'ProductAttributeValue';
      id: number;
      code: string;
      attribute_id: number;
      value: string;
      created_at?: string | null;
    }> | null;
    variants?: Array<{
      __typename?: 'ProductVariant';
      id: number;
      code: string;
      status: EProductStatus;
      name: string;
      sku?: string | null;
      created_at?: string | null;
      attributes?: Array<{
        __typename?: 'ProductAttribute';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
        values?: Array<{
          __typename?: 'ProductAttributeValue';
          id: number;
          code: string;
          attribute_id: number;
          value: string;
          created_at?: string | null;
        }> | null;
      }> | null;
      values?: Array<{
        __typename?: 'ProductAttributeValue';
        id: number;
        code: string;
        attribute_id: number;
        value: string;
        created_at?: string | null;
      }> | null;
      base_unit?: {
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      } | null;
      conversion_units?: Array<{
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      }> | null;
    }> | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  };
};

export type CreateUnitMutationVariables = Exact<{
  data: CreateUnitInput;
}>;

export type CreateUnitMutation = {
  __typename?: 'Mutation';
  createUnit: {
    __typename?: 'Unit';
    description?: string | null;
    name: string;
    created_at?: string | null;
  };
};

export type UpdateUnitMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateUnitInput;
}>;

export type UpdateUnitMutation = {
  __typename?: 'Mutation';
  updateUnit: {
    __typename?: 'Unit';
    description?: string | null;
    name: string;
    created_at?: string | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    phone: string;
    first_name?: string | null;
    last_name: string;
    email?: string | null;
    birthday?: string | null;
    address?: string | null;
    created_at?: string | null;
    avatar?: {
      __typename?: 'FileUpload';
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    phone: string;
    first_name?: string | null;
    last_name: string;
    email?: string | null;
    birthday?: string | null;
    address?: string | null;
    created_at?: string | null;
    avatar?: {
      __typename?: 'FileUpload';
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
  };
};

export type AddressQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type AddressQuery = {
  __typename?: 'Query';
  address?: {
    __typename?: 'Address';
    id: number;
    code: string;
    ward?: string | null;
    district?: string | null;
    province?: string | null;
    country?: string | null;
    postal_code?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    updated_at?: string | null;
    name: string;
    phone: string;
    email?: string | null;
    address: string;
    is_default?: boolean | null;
    created_at?: string | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type AddressesQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type AddressesQuery = {
  __typename?: 'Query';
  addresses: {
    __typename?: 'GetAddressType';
    data?: Array<{
      __typename?: 'Address';
      id: number;
      code: string;
      ward?: string | null;
      district?: string | null;
      province?: string | null;
      country?: string | null;
      name: string;
      phone: string;
      email?: string | null;
      address: string;
      is_default?: boolean | null;
      created_at?: string | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type AppointmentQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type AppointmentQuery = {
  __typename?: 'Query';
  appointment?: {
    __typename?: 'Appointment';
    id: number;
    code: string;
    content: string;
    updated_at?: string | null;
    name: string;
    phone: string;
    email?: string | null;
    title: string;
    status?: EAppointmentStatus | null;
    created_at?: string | null;
    attachments?: Array<{
      __typename?: 'FileUpload';
      name: string;
      url: string;
      created_at?: string | null;
    }> | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type AppointmentsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type AppointmentsQuery = {
  __typename?: 'Query';
  appointments: {
    __typename?: 'GetAppointmentType';
    data?: Array<{
      __typename?: 'Appointment';
      id: number;
      code: string;
      content: string;
      name: string;
      phone: string;
      email?: string | null;
      title: string;
      status?: EAppointmentStatus | null;
      created_at?: string | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type BlogQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type BlogQuery = {
  __typename?: 'Query';
  blog?: {
    __typename?: 'Blog';
    id: number;
    code: string;
    content: string;
    updated_at?: string | null;
    title: string;
    short_description?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    meta_robots?: string | null;
    created_at?: string | null;
    categories?: Array<{
      __typename?: 'Category';
      name: string;
      slug: string;
      type: ECategoryType;
      created_at?: string | null;
    }> | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type BlogsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type BlogsQuery = {
  __typename?: 'Query';
  blogs: {
    __typename?: 'GetBlogType';
    data?: Array<{
      __typename?: 'Blog';
      id: number;
      code: string;
      content: string;
      title: string;
      short_description?: string | null;
      meta_title?: string | null;
      meta_description?: string | null;
      meta_keywords?: string | null;
      meta_robots?: string | null;
      created_at?: string | null;
      categories?: Array<{
        __typename?: 'Category';
        name: string;
        slug: string;
        type: ECategoryType;
        created_at?: string | null;
      }> | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type BookingQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type BookingQuery = {
  __typename?: 'Query';
  booking?: {
    __typename?: 'Booking';
    id: number;
    code: string;
    type: EBookingType;
    content: string;
    updated_at?: string | null;
    customer_id?: number | null;
    name: string;
    phone: string;
    email: string;
    estimated_date?: string | null;
    status: EBookingStatus;
    created_at?: string | null;
    customer?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    categories?: Array<{
      __typename?: 'Category';
      name: string;
      slug: string;
      type: ECategoryType;
      created_at?: string | null;
    }> | null;
    products?: Array<{
      __typename?: 'Product';
      code: string;
      name: string;
      sku?: string | null;
      created_at?: string | null;
    }> | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type BookingsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type BookingsQuery = {
  __typename?: 'Query';
  bookings: {
    __typename?: 'GetBookingType';
    data?: Array<{
      __typename?: 'Booking';
      id: number;
      code: string;
      type: EBookingType;
      customer_id?: number | null;
      name: string;
      phone: string;
      email: string;
      estimated_date?: string | null;
      status: EBookingStatus;
      created_at?: string | null;
      customer?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
      categories?: Array<{
        __typename?: 'Category';
        name: string;
        slug: string;
        type: ECategoryType;
        created_at?: string | null;
      }> | null;
      products?: Array<{
        __typename?: 'Product';
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      }> | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type MyCartQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type MyCartQuery = {
  __typename?: 'Query';
  myCart?: {
    __typename?: 'Order';
    id: number;
    code: string;
    note?: string | null;
    updated_at?: string | null;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      id: number;
      code: string;
      order_id: number;
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      note?: string | null;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
      product?: {
        __typename?: 'Product';
        id: number;
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
        thumbnail?: {
          __typename?: 'FileUpload';
          id: number;
          code: string;
          name: string;
          url: string;
          created_at?: string | null;
        } | null;
      } | null;
      variant?: {
        __typename?: 'ProductVariant';
        id: number;
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      conversion_unit?: {
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      } | null;
      shipping?: {
        __typename?: 'OrderShipping';
        id: number;
        code: string;
        to_name: string;
        to_phone: string;
        to_address: string;
        estimated_delivery_at?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    histories?: Array<{
      __typename?: 'OrderHistory';
      id: number;
      code: string;
      status?: EOrderStatus | null;
      shipping_status?: EShippingStatus | null;
      created_at?: string | null;
    }> | null;
    customer?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type CategoryQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type CategoryQuery = {
  __typename?: 'Query';
  category?: {
    __typename?: 'Category';
    id: number;
    code: string;
    short_description?: string | null;
    description?: string | null;
    keywords?: Array<string> | null;
    updated_at?: string | null;
    name: string;
    slug: string;
    type: ECategoryType;
    created_at?: string | null;
    thumbnail?: {
      __typename?: 'FileUpload';
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
    children?: Array<{
      __typename?: 'Category';
      name: string;
      slug: string;
      type: ECategoryType;
      created_at?: string | null;
    }> | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type CategoriesQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type CategoriesQuery = {
  __typename?: 'Query';
  categories: {
    __typename?: 'GetCategoryType';
    data?: Array<{
      __typename?: 'Category';
      id: number;
      code: string;
      short_description?: string | null;
      description?: string | null;
      keywords?: Array<string> | null;
      name: string;
      slug: string;
      type: ECategoryType;
      created_at?: string | null;
      children?: Array<{
        __typename?: 'Category';
        id: number;
        code: string;
        name: string;
        slug: string;
        type: ECategoryType;
        created_at?: string | null;
      }> | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type ConversionUnitQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type ConversionUnitQuery = {
  __typename?: 'Query';
  conversionUnit?: {
    __typename?: 'ConversionUnit';
    id: number;
    code: string;
    updated_at?: string | null;
    product_id?: number | null;
    variant_id?: number | null;
    unit_id: number;
    conversion_rate: number;
    regular_price: number;
    sale_price: number;
    price: number;
    created_at?: string | null;
    unit?: { __typename?: 'Unit'; name: string; created_at?: string | null } | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type ConversionUnitsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type ConversionUnitsQuery = {
  __typename?: 'Query';
  conversionUnits: {
    __typename?: 'GetConversionUnitType';
    data?: Array<{
      __typename?: 'ConversionUnit';
      id: number;
      code: string;
      product_id?: number | null;
      variant_id?: number | null;
      unit_id: number;
      conversion_rate: number;
      regular_price: number;
      sale_price: number;
      price: number;
      created_at?: string | null;
      unit?: { __typename?: 'Unit'; name: string; created_at?: string | null } | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type FileUploadQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type FileUploadQuery = {
  __typename?: 'Query';
  file?: {
    __typename?: 'FileUpload';
    id: number;
    code: string;
    type: EFileType;
    size?: number | null;
    status: EFileStatus;
    updated_at?: string | null;
    name: string;
    url: string;
    created_at?: string | null;
    owner?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type FileUploadsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type FileUploadsQuery = {
  __typename?: 'Query';
  files: {
    __typename?: 'GetFileUploadType';
    data?: Array<{
      __typename?: 'FileUpload';
      id: number;
      code: string;
      type: EFileType;
      size?: number | null;
      status: EFileStatus;
      name: string;
      url: string;
      created_at?: string | null;
      owner?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type OrderShippingQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type OrderShippingQuery = {
  __typename?: 'Query';
  shipping?: {
    __typename?: 'OrderShipping';
    id: number;
    code: string;
    updated_at?: string | null;
    to_name: string;
    to_phone: string;
    to_address: string;
    estimated_delivery_at?: string | null;
    created_at?: string | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type OrderShippingsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type OrderShippingsQuery = {
  __typename?: 'Query';
  shippings: {
    __typename?: 'GetOrderShippingType';
    data?: Array<{
      __typename?: 'OrderShipping';
      id: number;
      code: string;
      to_name: string;
      to_phone: string;
      to_address: string;
      estimated_delivery_at?: string | null;
      created_at?: string | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type OrderQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type OrderQuery = {
  __typename?: 'Query';
  order?: {
    __typename?: 'Order';
    id: number;
    code: string;
    note?: string | null;
    updated_at?: string | null;
    customer_id?: number | null;
    total_cost: number;
    service_fee: number;
    tax: number;
    discount: number;
    final_cost: number;
    paid: number;
    remaining: number;
    status: EOrderStatus;
    shipping_status: EShippingStatus;
    payment_status: EPaymentStatus;
    created_at?: string | null;
    order_details?: Array<{
      __typename?: 'OrderDetail';
      id: number;
      code: string;
      order_id: number;
      product_id: number;
      variant_id: number;
      conversion_unit_id: number;
      note?: string | null;
      price: number;
      quantity: number;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
      product?: {
        __typename?: 'Product';
        id: number;
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
        thumbnail?: {
          __typename?: 'FileUpload';
          id: number;
          code: string;
          name: string;
          url: string;
          created_at?: string | null;
        } | null;
      } | null;
      variant?: {
        __typename?: 'ProductVariant';
        id: number;
        code: string;
        name: string;
        sku?: string | null;
        created_at?: string | null;
      } | null;
      conversion_unit?: {
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      } | null;
      shipping?: {
        __typename?: 'OrderShipping';
        id: number;
        code: string;
        to_name: string;
        to_phone: string;
        to_address: string;
        estimated_delivery_at?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    histories?: Array<{
      __typename?: 'OrderHistory';
      id: number;
      code: string;
      status?: EOrderStatus | null;
      shipping_status?: EShippingStatus | null;
      created_at?: string | null;
    }> | null;
    customer?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type OrdersQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type OrdersQuery = {
  __typename?: 'Query';
  orders: {
    __typename?: 'GetOrderType';
    data?: Array<{
      __typename?: 'Order';
      id: number;
      code: string;
      note?: string | null;
      customer_id?: number | null;
      total_cost: number;
      service_fee: number;
      tax: number;
      discount: number;
      final_cost: number;
      paid: number;
      remaining: number;
      status: EOrderStatus;
      shipping_status: EShippingStatus;
      payment_status: EPaymentStatus;
      created_at?: string | null;
      customer?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
      order_details?: Array<{
        __typename?: 'OrderDetail';
        id: number;
        code: string;
        order_id: number;
        product_id: number;
        variant_id: number;
        conversion_unit_id: number;
        note?: string | null;
        price: number;
        quantity: number;
        total_cost: number;
        service_fee: number;
        tax: number;
        discount: number;
        final_cost: number;
        status: EOrderStatus;
        shipping_status: EShippingStatus;
        payment_status: EPaymentStatus;
        created_at?: string | null;
        product?: {
          __typename?: 'Product';
          id: number;
          code: string;
          name: string;
          sku?: string | null;
          created_at?: string | null;
          thumbnail?: {
            __typename?: 'FileUpload';
            id: number;
            code: string;
            name: string;
            url: string;
            created_at?: string | null;
          } | null;
        } | null;
        variant?: {
          __typename?: 'ProductVariant';
          id: number;
          code: string;
          name: string;
          sku?: string | null;
          created_at?: string | null;
        } | null;
        conversion_unit?: {
          __typename?: 'ConversionUnit';
          id: number;
          code: string;
          product_id?: number | null;
          variant_id?: number | null;
          unit_id: number;
          conversion_rate: number;
          regular_price: number;
          sale_price: number;
          price: number;
          created_at?: string | null;
          unit?: {
            __typename?: 'Unit';
            id: number;
            code: string;
            name: string;
            created_at?: string | null;
          } | null;
        } | null;
        shipping?: {
          __typename?: 'OrderShipping';
          id: number;
          code: string;
          to_name: string;
          to_phone: string;
          to_address: string;
          estimated_delivery_at?: string | null;
          created_at?: string | null;
        } | null;
      }> | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type PermissionQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type PermissionQuery = {
  __typename?: 'Query';
  permission?: { __typename?: 'Permission'; id: number; label: string; value: string } | null;
};

export type PermissionsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type PermissionsQuery = {
  __typename?: 'Query';
  permissions: {
    __typename?: 'GetPermissionType';
    data?: Array<{ __typename?: 'Permission'; id: number; label: string; value: string }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type ProductAttributeValueQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type ProductAttributeValueQuery = {
  __typename?: 'Query';
  productAttributeValue?: {
    __typename?: 'ProductAttributeValue';
    id: number;
    attribute_id: number;
    value: string;
    created_at?: string | null;
  } | null;
};

export type ProductAttributeValuesQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type ProductAttributeValuesQuery = {
  __typename?: 'Query';
  productAttributeValues: {
    __typename?: 'GetAttributeValueType';
    data?: Array<{
      __typename?: 'ProductAttributeValue';
      id: number;
      attribute_id: number;
      value: string;
      created_at?: string | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type ProductAttributeQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type ProductAttributeQuery = {
  __typename?: 'Query';
  productAttribute?: {
    __typename?: 'ProductAttribute';
    id: number;
    name: string;
    created_at?: string | null;
  } | null;
};

export type ProductAttributesQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type ProductAttributesQuery = {
  __typename?: 'Query';
  productAttributes: {
    __typename?: 'GetAttributeType';
    data?: Array<{
      __typename?: 'ProductAttribute';
      id: number;
      name: string;
      created_at?: string | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type ProductQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type ProductQuery = {
  __typename?: 'Query';
  product?: {
    __typename?: 'Product';
    id: number;
    code: string;
    slug?: string | null;
    sku?: string | null;
    type: EProductType;
    features?: Array<string> | null;
    turnaround?: string | null;
    short_description?: string | null;
    description?: string | null;
    status: EProductStatus;
    likes?: number | null;
    average_rating?: number | null;
    rating_count?: number | null;
    updated_at?: string | null;
    name: string;
    created_at?: string | null;
    thumbnail?: {
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
    gallery_images?: Array<{
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    }> | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      code: string;
      name: string;
      slug: string;
      type: ECategoryType;
      created_at?: string | null;
    }> | null;
    base_unit?: {
      __typename?: 'ConversionUnit';
      id: number;
      code: string;
      product_id?: number | null;
      variant_id?: number | null;
      unit_id: number;
      conversion_rate: number;
      regular_price: number;
      sale_price: number;
      price: number;
      created_at?: string | null;
      unit?: {
        __typename?: 'Unit';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
      } | null;
    } | null;
    conversion_units?: Array<{
      __typename?: 'ConversionUnit';
      id: number;
      code: string;
      product_id?: number | null;
      variant_id?: number | null;
      unit_id: number;
      conversion_rate: number;
      regular_price: number;
      sale_price: number;
      price: number;
      created_at?: string | null;
      unit?: {
        __typename?: 'Unit';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
      } | null;
    }> | null;
    attributes?: Array<{
      __typename?: 'ProductAttribute';
      id: number;
      code: string;
      name: string;
      created_at?: string | null;
      values?: Array<{
        __typename?: 'ProductAttributeValue';
        id: number;
        code: string;
        attribute_id: number;
        value: string;
        created_at?: string | null;
      }> | null;
    }> | null;
    values?: Array<{
      __typename?: 'ProductAttributeValue';
      id: number;
      code: string;
      attribute_id: number;
      value: string;
      created_at?: string | null;
    }> | null;
    variants?: Array<{
      __typename?: 'ProductVariant';
      id: number;
      code: string;
      status: EProductStatus;
      name: string;
      sku?: string | null;
      created_at?: string | null;
      attributes?: Array<{
        __typename?: 'ProductAttribute';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
        values?: Array<{
          __typename?: 'ProductAttributeValue';
          id: number;
          code: string;
          attribute_id: number;
          value: string;
          created_at?: string | null;
        }> | null;
      }> | null;
      values?: Array<{
        __typename?: 'ProductAttributeValue';
        id: number;
        code: string;
        attribute_id: number;
        value: string;
        created_at?: string | null;
      }> | null;
      base_unit?: {
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      } | null;
      conversion_units?: Array<{
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      }> | null;
    }> | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type ProductsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type ProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'GetProductType';
    data?: Array<{
      __typename?: 'Product';
      id: number;
      code: string;
      slug?: string | null;
      sku?: string | null;
      type: EProductType;
      features?: Array<string> | null;
      turnaround?: string | null;
      short_description?: string | null;
      description?: string | null;
      status: EProductStatus;
      likes?: number | null;
      average_rating?: number | null;
      rating_count?: number | null;
      thumbnail_id?: number | null;
      name: string;
      created_at?: string | null;
      thumbnail?: {
        __typename?: 'FileUpload';
        id: number;
        code: string;
        name: string;
        url: string;
        created_at?: string | null;
      } | null;
      gallery_images?: Array<{
        __typename?: 'FileUpload';
        id: number;
        code: string;
        name: string;
        url: string;
        created_at?: string | null;
      }> | null;
      categories?: Array<{
        __typename?: 'Category';
        id: number;
        code: string;
        name: string;
        slug: string;
        type: ECategoryType;
        created_at?: string | null;
      }> | null;
      base_unit?: {
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      } | null;
      conversion_units?: Array<{
        __typename?: 'ConversionUnit';
        id: number;
        code: string;
        product_id?: number | null;
        variant_id?: number | null;
        unit_id: number;
        conversion_rate: number;
        regular_price: number;
        sale_price: number;
        price: number;
        created_at?: string | null;
        unit?: {
          __typename?: 'Unit';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
        } | null;
      }> | null;
      attributes?: Array<{
        __typename?: 'ProductAttribute';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
        values?: Array<{
          __typename?: 'ProductAttributeValue';
          id: number;
          code: string;
          attribute_id: number;
          value: string;
          created_at?: string | null;
        }> | null;
      }> | null;
      values?: Array<{
        __typename?: 'ProductAttributeValue';
        id: number;
        code: string;
        attribute_id: number;
        value: string;
        created_at?: string | null;
      }> | null;
      variants?: Array<{
        __typename?: 'ProductVariant';
        id: number;
        code: string;
        status: EProductStatus;
        name: string;
        sku?: string | null;
        created_at?: string | null;
        attributes?: Array<{
          __typename?: 'ProductAttribute';
          id: number;
          code: string;
          name: string;
          created_at?: string | null;
          values?: Array<{
            __typename?: 'ProductAttributeValue';
            id: number;
            code: string;
            attribute_id: number;
            value: string;
            created_at?: string | null;
          }> | null;
        }> | null;
        values?: Array<{
          __typename?: 'ProductAttributeValue';
          id: number;
          code: string;
          attribute_id: number;
          value: string;
          created_at?: string | null;
        }> | null;
        base_unit?: {
          __typename?: 'ConversionUnit';
          id: number;
          code: string;
          product_id?: number | null;
          variant_id?: number | null;
          unit_id: number;
          conversion_rate: number;
          regular_price: number;
          sale_price: number;
          price: number;
          created_at?: string | null;
          unit?: {
            __typename?: 'Unit';
            id: number;
            code: string;
            name: string;
            created_at?: string | null;
          } | null;
        } | null;
        conversion_units?: Array<{
          __typename?: 'ConversionUnit';
          id: number;
          code: string;
          product_id?: number | null;
          variant_id?: number | null;
          unit_id: number;
          conversion_rate: number;
          regular_price: number;
          sale_price: number;
          price: number;
          created_at?: string | null;
          unit?: {
            __typename?: 'Unit';
            id: number;
            code: string;
            name: string;
            created_at?: string | null;
          } | null;
        }> | null;
      }> | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type RoleQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type RoleQuery = {
  __typename?: 'Query';
  role?: {
    __typename?: 'Role';
    id: number;
    code: string;
    updated_at?: string | null;
    name: string;
    created_at?: string | null;
    permissions?: Array<{
      __typename?: 'Permission';
      id: number;
      label: string;
      value: string;
    }> | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type RolesQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type RolesQuery = {
  __typename?: 'Query';
  roles: {
    __typename?: 'GetRoleType';
    data?: Array<{
      __typename?: 'Role';
      id: number;
      code: string;
      updated_at?: string | null;
      name: string;
      created_at?: string | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
      updater?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type UnitQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type UnitQuery = {
  __typename?: 'Query';
  unit?: {
    __typename?: 'Unit';
    id: number;
    code: string;
    updated_at?: string | null;
    name: string;
    created_at?: string | null;
    creator?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
    updater?: {
      __typename?: 'User';
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
    } | null;
  } | null;
};

export type UnitsQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type UnitsQuery = {
  __typename?: 'Query';
  units: {
    __typename?: 'GetUnitType';
    data?: Array<{
      __typename?: 'Unit';
      id: number;
      code: string;
      slug: string;
      updated_at?: string | null;
      name: string;
      created_at?: string | null;
      creator?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
      updater?: {
        __typename?: 'User';
        phone: string;
        first_name?: string | null;
        last_name: string;
        email?: string | null;
        birthday?: string | null;
        address?: string | null;
        created_at?: string | null;
      } | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};

export type MyUserQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type MyUserQuery = {
  __typename?: 'Query';
  myUser?: {
    __typename?: 'User';
    id: number;
    code: string;
    phone: string;
    first_name?: string | null;
    last_name: string;
    email?: string | null;
    birthday?: string | null;
    address?: string | null;
    created_at?: string | null;
    avatar?: {
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
  } | null;
};

export type UserQueryVariables = Exact<{
  query?: InputMaybe<GetOneInput>;
}>;

export type UserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: number;
    code: string;
    phone: string;
    first_name?: string | null;
    last_name: string;
    email?: string | null;
    birthday?: string | null;
    address?: string | null;
    created_at?: string | null;
    avatar?: {
      __typename?: 'FileUpload';
      id: number;
      code: string;
      name: string;
      url: string;
      created_at?: string | null;
    } | null;
    roles?: Array<{
      __typename?: 'Role';
      id: number;
      code: string;
      name: string;
      created_at?: string | null;
      permissions?: Array<{
        __typename?: 'Permission';
        id: number;
        label: string;
        value: string;
      }> | null;
    }> | null;
  } | null;
};

export type UsersQueryVariables = Exact<{
  query?: InputMaybe<GetManyInput>;
}>;

export type UsersQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'GetUserType';
    data?: Array<{
      __typename?: 'User';
      id: number;
      code: string;
      phone: string;
      first_name?: string | null;
      last_name: string;
      email?: string | null;
      birthday?: string | null;
      address?: string | null;
      created_at?: string | null;
      avatar?: {
        __typename?: 'FileUpload';
        id: number;
        code: string;
        name: string;
        url: string;
        created_at?: string | null;
      } | null;
      roles?: Array<{
        __typename?: 'Role';
        id: number;
        code: string;
        name: string;
        created_at?: string | null;
      }> | null;
    }> | null;
    metadata?: {
      __typename?: 'MetadataResponse';
      current_page?: number | null;
      page_size?: number | null;
      total_items?: number | null;
      total_pages?: number | null;
    } | null;
  };
};
