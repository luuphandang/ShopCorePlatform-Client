import { gql } from '@apollo/client';

import {
  CONVERSION_UNIT_FRAGMENT,
  FILE_UPLOAD_FRAGMENT,
  ORDER_DETAIL_FRAGMENT,
  ORDER_FRAGMENT,
  ORDER_HISTORY_FRAGMENT,
  ORDER_SHIPPING_FRAGMENT,
  PRODUCT_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
  UNIT_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const CREATE_CART = gql`
  mutation CreateCart($data: CreateOrderInput!) {
    createCart(data: $data) {
      ...OrderFields
      id
      code
      note
      order_details {
        ...OrderDetailFields
        id
        code
        order_id
        product_id
        variant_id
        conversion_unit_id
        note
        product {
          ...ProductFields
          id
          code
          thumbnail {
            ...FileUploadFields
            id
            code
          }
        }
        variant {
          ...ProductVariantFields
          id
          code
        }
        conversion_unit {
          ...ConversionUnitFields
          id
          code
          unit {
            ...UnitFields
            id
            code
          }
        }
        shipping {
          ...OrderShippingFields
          id
          code
        }
      }
      histories {
        ...OrderHistoryFields
        id
        code
      }
      customer {
        ...UserFields
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
  ${UNIT_FRAGMENT}
  ${ORDER_SHIPPING_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
  ${ORDER_HISTORY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const UPDATE_CART = gql`
  mutation UpdateCart($code: String!, $data: UpdateOrderInput!) {
    updateCart(code: $code, data: $data) {
      ...OrderFields
      order_details {
        ...OrderDetailFields
        product {
          ...ProductFields
        }
        variant {
          ...ProductVariantFields
        }
        conversion_unit {
          ...ConversionUnitFields
        }
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($code: String!, $data: AddToCartInput!) {
    addToCart(code: $code, data: $data) {
      ...OrderFields
      order_details {
        ...OrderDetailFields
        product {
          ...ProductFields
        }
        variant {
          ...ProductVariantFields
        }
        conversion_unit {
          ...ConversionUnitFields
        }
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($code: String!, $data: RemoveFromCartInput!) {
    removeFromCart(code: $code, data: $data) {
      ...OrderFields
      order_details {
        ...OrderDetailFields
        product {
          ...ProductFields
        }
        variant {
          ...ProductVariantFields
        }
        conversion_unit {
          ...ConversionUnitFields
        }
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
`;

export const CLEAR_CART = gql`
  mutation ClearCart($code: String!) {
    clearCart(code: $code) {
      ...OrderFields
      order_details {
        ...OrderDetailFields
        product {
          ...ProductFields
        }
        variant {
          ...ProductVariantFields
        }
        conversion_unit {
          ...ConversionUnitFields
        }
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
`;

export const CHECKOUT_CART = gql`
  mutation CheckoutCart($code: String!, $data: CheckoutCartInput!) {
    checkoutCart(code: $code, data: $data) {
      ...OrderFields
    }
  }
  ${ORDER_FRAGMENT}
`;
