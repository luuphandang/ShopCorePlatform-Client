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

export const MY_CART = gql`
  query MyCart($query: GetOneInput) {
    myCart(query: $query) {
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
      creator {
        ...UserFields
      }
      updated_at
      updater {
        ...UserFields
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_HISTORY_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${CONVERSION_UNIT_FRAGMENT}
  ${ORDER_SHIPPING_FRAGMENT}
  ${UNIT_FRAGMENT}
  ${USER_FRAGMENT}
`;
