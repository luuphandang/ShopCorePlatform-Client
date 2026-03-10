import { gql } from '@apollo/client';

export const ORDER_SHIPPING_FRAGMENT = gql`
  fragment OrderShippingFields on OrderShipping {
    to_name
    to_phone
    to_address
    estimated_delivery_at
    created_at
  }
`;
