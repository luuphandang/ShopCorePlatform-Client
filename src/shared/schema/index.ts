import * as z from 'zod';

import { baseAppointmentSchema } from './appointment.schema';
import { baseSignInSchema, baseSignUpSchema } from './auth.schema';
import { baseBookingSchema } from './booking.schema';
import { baseCategorySchema } from './category.schema';
import { baseConversionUnitSchema } from './conversion-unit.schema';
import { baseFileUploadSchema } from './filte-upload.schema';
import { baseOrderFilterSchema, baseOrderSchema } from './order.schema';
import { baseOrderDetailSchema } from './order-detail.schema';
import { baseOrderShippingSchema } from './order-shipping';
import { baseProductSchema } from './product.schema';
import { baseProductAttributeSchema } from './product-attribute.schema';
import { baseProductAttributeValueSchema } from './product-attribute-value.schema';
import { baseProductVariantSchema } from './product-variant.schema';
import { baseUnitSchema } from './unit.schema';
import { baseUserSchema } from './user.schema';

// Sign In Schema
export const signInSchema = baseSignInSchema.extend({});
export type TSignInSchema = z.infer<typeof signInSchema>;

// Sign Up Schema
export const signUpSchema = baseSignUpSchema
  .extend({})
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu không khớp',
    path: ['confirm_password'],
  });
export type TSignUpSchema = z.infer<typeof signUpSchema>;

// User Schema
export const userSchema = baseUserSchema.extend({
  avatar: baseFileUploadSchema,
});
export type TUserSchema = z.infer<typeof userSchema>;

// File Upload Schema
export const fileUploadSchema = baseFileUploadSchema.extend({});
export type TFileUploadSchema = z.infer<typeof fileUploadSchema>;
export const assignFileUploadSchema = fileUploadSchema.pick({
  id: true,
  name: true,
  url: true,
  type: true,
});
export type TAssignFileUploadSchema = z.infer<typeof assignFileUploadSchema>;

// Unit Schema
export const unitSchema = baseUnitSchema.extend({});
export type TUnitSchema = z.infer<typeof unitSchema>;
export const assignUnitSchema = unitSchema.pick({
  id: true,
  name: true,
});
export type TAssignUnitSchema = z.infer<typeof assignUnitSchema>;

// Category Schema
export const categorySchema = baseCategorySchema.extend({});
export type TCategorySchema = z.infer<typeof categorySchema>;
export const assignCategorySchema = categorySchema.pick({ id: true, name: true, type: true });
export type TAssignCategorySchema = z.infer<typeof assignCategorySchema>;

// Appointment Schema
export const appointmentSchema = baseAppointmentSchema.extend({});
export type TAppointmentSchema = z.infer<typeof appointmentSchema>;

// Booking Product Schema
export const bookingSchema = baseBookingSchema.extend({
  attachments: z.array(assignFileUploadSchema),
  agree_terms: z.boolean().refine((val) => val === true, {
    message: 'Bạn phải đồng ý với điều khoản và điều kiện',
  }),
});
export type TBookingSchema = z.infer<typeof bookingSchema>;

// Conversion Unit Schema
export const conversionUnitSchema = baseConversionUnitSchema.extend({
  unit: assignUnitSchema,
});
export type TConversionUnitSchema = z.infer<typeof conversionUnitSchema>;
export const assignConversionUnitSchema = conversionUnitSchema.pick({
  id: true,
  unit_id: true,
  unit: true,
  conversion_rate: true,
  regular_price: true,
  sale_price: true,
  price: true,
});
export type TAssignConversionUnitSchema = z.infer<typeof assignConversionUnitSchema>;

// Product Attribute Value Schema
export const productAttributeValueSchema = baseProductAttributeValueSchema.extend({});
export type TProductAttributeValueSchema = z.infer<typeof productAttributeValueSchema>;
export const assignProductAttributeValueSchema = productAttributeValueSchema.pick({
  id: true,
  attribute_id: true,
  value: true,
});
export type TAssignProductAttributeValueSchema = z.infer<typeof assignProductAttributeValueSchema>;

// Product Attribute Schema - Define assign schema first to avoid circular dependency
export const assignProductAttributeSchema = baseProductAttributeSchema
  .pick({
    id: true,
    name: true,
  })
  .extend({
    values: z.array(productAttributeValueSchema).min(1, {
      message: 'Chưa có giá trị thuộc tính',
    }),
  });
export type TAssignProductAttributeSchema = z.infer<typeof assignProductAttributeSchema>;

// Product Attribute Schema
export const productAttributeSchema = baseProductAttributeSchema.extend({
  values: z.array(productAttributeValueSchema).min(1, {
    message: 'Chưa có giá trị thuộc tính',
  }),
});
export type TProductAttributeSchema = z.infer<typeof productAttributeSchema>;

// Product Variant Schema - Define assign schema first to avoid circular dependency
export const assignProductVariantSchema = baseProductVariantSchema
  .pick({
    id: true,
    name: true,
    code: true,
    sku: true,
    status: true,
  })
  .extend({
    gallery_images: z.array(assignFileUploadSchema).optional(),
    conversion_units: z.array(assignConversionUnitSchema).min(1, {
      message: 'Chưa có đơn vị quy đổi',
    }),
    attributes: z.array(assignProductAttributeSchema).min(1, {
      message: 'Chưa có thuộc tính',
    }),
    values: z.array(assignProductAttributeValueSchema).min(1, {
      message: 'Chưa có giá trị thuộc tính',
    }),
  });
export type TAssignProductVariantSchema = z.infer<typeof assignProductVariantSchema>;

// Product Variant Schema
export const productVariantSchema = baseProductVariantSchema.extend({
  gallery_images: z.array(assignFileUploadSchema).optional(),
  conversion_units: z.array(assignConversionUnitSchema).min(1, {
    message: 'Chưa có đơn vị quy đổi',
  }),
  attributes: z.array(assignProductAttributeSchema).min(1, {
    message: 'Chưa có thuộc tính',
  }),
  values: z.array(assignProductAttributeValueSchema).min(1, {
    message: 'Chưa có giá trị thuộc tính',
  }),
});
export type TProductVariantSchema = z.infer<typeof productVariantSchema>;

// Product Schema
export const productSchema = baseProductSchema.extend({
  thumbnail: baseFileUploadSchema,
  gallery_images: z.array(baseFileUploadSchema).optional(),
  categories: z.array(assignCategorySchema).min(1, {
    message: 'Chưa có danh mục',
  }),
  conversion_units: z.array(assignConversionUnitSchema).min(1, {
    message: 'Chưa có bảng giá',
  }),
  attributes: z.array(assignProductAttributeSchema).min(1, {
    message: 'Chưa có thuộc tính',
  }),
  values: z.array(assignProductAttributeValueSchema).min(1, {
    message: 'Chưa có giá trị thuộc tính',
  }),
  variants: z.array(assignProductVariantSchema).min(1, {
    message: 'Chưa có phiên bản',
  }),
});
export type TProductSchema = z.infer<typeof productSchema>;

// Order Shipping Schema
export const orderShippingSchema = baseOrderShippingSchema.extend({});
export type TOrderShippingSchema = z.infer<typeof orderShippingSchema>;

// Order Detail Schema
export const orderDetailSchema = baseOrderDetailSchema.extend({
  note_checked: z.boolean().optional(),
});
export type TOrderDetailSchema = z.infer<typeof orderDetailSchema>;

// Order Schema
export const orderSchema = baseOrderSchema.extend({
  order_details: z
    .array(
      orderDetailSchema.extend({
        product: productSchema,
        variant: productVariantSchema,
        conversion_unit: conversionUnitSchema,
        shipping: orderShippingSchema,
      }),
    )
    .min(1, { message: 'Chưa có chi tiết đơn hàng' }),
});
export type TOrderSchema = z.infer<typeof orderSchema>;

export const orderFilterSchema = baseOrderFilterSchema.extend({});
export type TOrderFilterSchema = z.infer<typeof orderFilterSchema>;

// Checkout Cart Schema
export const checkoutCartSchema = z.object({
  vouchers: z.array(z.string()),
  address_id: z.number(),
  to_name: z.string().min(1, { message: 'Tên người nhận không được để trống' }),
  to_phone: z.string().min(1, { message: 'Số điện thoại không được để trống' }),
  to_address: z.string().min(1, { message: 'Địa chỉ không được để trống' }),
  to_ward: z.string().nullable(),
  to_district: z.string().nullable(),
  to_province: z.string().nullable(),
  to_country: z.string().nullable(),
  to_postal_code: z.string().nullable(),
  to_latitude: z.number().nullable(),
  to_longitude: z.number().nullable(),
  estimated_delivery_at: z.string().nullable(),
  payment_method: z.string().min(1, { message: 'Phương thức thanh toán không được để trống' }),
  note: z.string().nullable(),
});
export type TCheckoutCartSchema = z.infer<typeof checkoutCartSchema>;
