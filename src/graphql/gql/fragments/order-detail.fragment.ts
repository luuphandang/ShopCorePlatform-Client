import { gql } from '@apollo/client';

export const ORDER_DETAIL_FRAGMENT = gql`
  fragment OrderDetailFields on OrderDetail {
    product_id
    variant_id
    conversion_unit_id
    price
    quantity
    total_cost
    service_fee
    tax
    discount
    final_cost
    status
    shipping_status
    payment_status
    created_at
  }
`;
