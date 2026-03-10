import {
  z,
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodDefault,
  ZodEffects,
  ZodEnum,
  ZodNativeEnum,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
  ZodTypeAny,
} from 'zod';

export function sanitizeFromZodSchema<T extends ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  if (schema instanceof ZodString) {
    return typeof data === 'string' ? data : '';
  }

  if (schema instanceof ZodNumber) {
    return typeof data === 'number' ? data : 0;
  }

  if (schema instanceof ZodBoolean) {
    return typeof data === 'boolean' ? data : false;
  }

  if (schema instanceof ZodDate) {
    if (data instanceof Date) return data;

    if (typeof data === 'string') {
      const parsedDate = new Date(data);

      return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }

    return undefined;
  }

  if (schema instanceof ZodEffects) {
    return sanitizeFromZodSchema(schema._def.schema, data);
  }

  if (schema instanceof ZodArray) {
    return Array.isArray(data)
      ? data.map((item) => sanitizeFromZodSchema(schema.element, item))
      : [];
  }

  if (schema instanceof ZodEnum) {
    return schema.enum.includes(data) ? data : schema.enum[0];
  }

  if (schema instanceof ZodNativeEnum) {
    return Object.values(schema._def.values).includes(data) ? data : undefined;
  }

  if (schema instanceof ZodOptional) {
    return data ?? undefined;
  }

  if (schema instanceof ZodNullable) {
    return data ?? null;
  }

  if (schema instanceof ZodDefault) {
    const inner = schema._def.innerType;
    return data === undefined || data === null
      ? schema._def.defaultValue()
      : sanitizeFromZodSchema(inner, data);
  }

  if (schema instanceof ZodObject) {
    const output: Record<string, unknown> = {};
    const shape = schema.shape;
    const dataObj = data as Record<string, unknown> | null | undefined;

    for (const key in shape) {
      const value = dataObj?.[key];
      output[key] = sanitizeFromZodSchema(shape[key], value);
    }

    return output as z.infer<T>;
  }

  return data as z.infer<T>;
}
