'use client';

import { ApolloCache, DefaultContext, MutationHookOptions, useMutation } from '@apollo/client';

import {
  AddToCartInput,
  AddToCartMutation,
  AddToCartMutationVariables,
  CheckoutCartMutation,
  CheckoutCartMutationVariables,
  ClearCartMutation,
  ClearCartMutationVariables,
  CreateCartMutation,
  CreateCartMutationVariables,
  EOrderStatus,
  RemoveFromCartInput,
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables,
  UpdateCartMutation,
  UpdateCartMutationVariables,
} from '@/graphql/@types';
import {
  ADD_TO_CART,
  CHECKOUT_CART,
  CLEAR_CART,
  CREATE_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from '@/graphql/gql';
import { TCheckoutCartSchema } from '@/shared/schema';

type CreateCartOptions = Omit<
  MutationHookOptions<
    CreateCartMutation,
    CreateCartMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCreateCartMutation = (options?: CreateCartOptions) => {
  const [mutate, result] = useMutation<CreateCartMutation, CreateCartMutationVariables>(
    CREATE_CART,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['MyCart'],
      ...options,
    },
  );

  const createCart = (data: CreateCartMutationVariables['data']) =>
    mutate({ variables: { data: sanitizeCreateCart(data) } });

  return [createCart, result] as const;
};
const sanitizeCreateCart = (data: Record<string, unknown>) => {
  const sanitizeData = {
    status: EOrderStatus.Cart,
  };

  if (data?.customer_id) Object.assign(sanitizeData, { customer_id: data.customer_id });
  if (data?.code) Object.assign(sanitizeData, { code: data.code });

  return sanitizeData;
};

type UpdateCartOptions = Omit<
  MutationHookOptions<
    UpdateCartMutation,
    UpdateCartMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useUpdateCartMutation = (options?: UpdateCartOptions) => {
  const [mutate, result] = useMutation<UpdateCartMutation, UpdateCartMutationVariables>(
    UPDATE_CART,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['MyCart'],
      ...options,
    },
  );

  const updateCart = (code: string, data: UpdateCartMutationVariables['data']) =>
    mutate({ variables: { code, data: sanitizeUpdateCart(data) } });

  return [updateCart, result] as const;
};
const sanitizeUpdateCart = (data: Record<string, unknown>) => {
  const sanitizeData = {};

  if (data?.order_details) Object.assign(sanitizeData, { order_details: data.order_details });

  return sanitizeData;
};

type AddToCartOptions = Omit<
  MutationHookOptions<
    AddToCartMutation,
    AddToCartMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useAddToCartMutation = (options?: AddToCartOptions) => {
  const [mutate, result] = useMutation<AddToCartMutation, AddToCartMutationVariables>(ADD_TO_CART, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    refetchQueries: ['MyCart'],
    ...options,
  });

  const addToCart = (code: string, data: AddToCartMutationVariables['data']) =>
    mutate({ variables: { code, data: sanitizeAddToCart(data) } });

  return [addToCart, result] as const;
};
const sanitizeAddToCart = (data: AddToCartInput) => {
  const sanitizeData = {
    product_id: data.product_id,
    variant_id: data.variant_id,
    conversion_unit_id: data.conversion_unit_id,
    quantity: data.quantity,
  };

  if (data.note) Object.assign(sanitizeData, { note: data.note });

  return sanitizeData;
};

type RemoveFromCartOptions = Omit<
  MutationHookOptions<
    RemoveFromCartMutation,
    RemoveFromCartMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useRemoveFromCartMutation = (options?: RemoveFromCartOptions) => {
  const [mutate, result] = useMutation<RemoveFromCartMutation, RemoveFromCartMutationVariables>(
    REMOVE_FROM_CART,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['MyCart'],
      ...options,
    },
  );

  const removeFromCart = (code: string, data: RemoveFromCartMutationVariables['data']) =>
    mutate({ variables: { code, data: sanitizeRemoveFromCart(data) } });

  return [removeFromCart, result] as const;
};
const sanitizeRemoveFromCart = (data: RemoveFromCartInput) => {
  const sanitizeData = {
    product_id: data.product_id,
    variant_id: data.variant_id,
    conversion_unit_id: data.conversion_unit_id,
  };

  return sanitizeData;
};

type ClearCartOptions = Omit<
  MutationHookOptions<
    ClearCartMutation,
    ClearCartMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useClearCartMutation = (options?: ClearCartOptions) => {
  const [mutate, result] = useMutation<ClearCartMutation, ClearCartMutationVariables>(CLEAR_CART, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    refetchQueries: ['MyCart'],
    ...options,
  });

  const clearCart = (code: string) => mutate({ variables: { code } });

  return [clearCart, result] as const;
};

type CheckoutCartOptions = Omit<
  MutationHookOptions<
    CheckoutCartMutation,
    CheckoutCartMutationVariables,
    DefaultContext,
    ApolloCache<Record<string, unknown>>
  >,
  'variables'
>;
export const useCheckoutCartMutation = (options?: CheckoutCartOptions) => {
  const [mutate, result] = useMutation<CheckoutCartMutation, CheckoutCartMutationVariables>(
    CHECKOUT_CART,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      refetchQueries: ['MyCart'],
      ...options,
    },
  );

  const checkoutCart = (code: string, data: TCheckoutCartSchema) =>
    mutate({ variables: { code, data: sanitizeCheckoutCart(data) } });

  return [checkoutCart, result] as const;
};
const sanitizeCheckoutCart = (data: TCheckoutCartSchema) => {
  const sanitizeData = {
    to_address: data.to_address,
    to_name: data.to_name,
    to_phone: data.to_phone,
  };

  if (data.vouchers) Object.assign(sanitizeData, { vouchers: data.vouchers });
  if (data.address_id) Object.assign(sanitizeData, { address_id: data.address_id });
  if (data.to_ward) Object.assign(sanitizeData, { to_ward: data.to_ward });
  if (data.to_district) Object.assign(sanitizeData, { to_district: data.to_district });
  if (data.to_province) Object.assign(sanitizeData, { to_province: data.to_province });
  if (data.to_country) Object.assign(sanitizeData, { to_country: data.to_country });
  if (data.to_postal_code) Object.assign(sanitizeData, { to_postal_code: data.to_postal_code });
  if (data.to_latitude) Object.assign(sanitizeData, { to_latitude: data.to_latitude });
  if (data.to_longitude) Object.assign(sanitizeData, { to_longitude: data.to_longitude });
  if (data.estimated_delivery_at) {
    const dateString = data.estimated_delivery_at;
    const [day, month, year] = dateString.split('-');
    const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    Object.assign(sanitizeData, { estimated_delivery_at: dateObject });
  }
  if (data.payment_method) Object.assign(sanitizeData, { payment_method: data.payment_method });
  if (data.note) Object.assign(sanitizeData, { note: data.note });

  return sanitizeData;
};
