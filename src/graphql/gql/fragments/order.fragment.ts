import { gql } from '@apollo/client';

export const ORDER_FRAGMENT = gql`
  fragment OrderFields on Order {
    id
    code
    customer_id
    total_cost
    service_fee
    tax
    discount
    final_cost
    paid
    remaining
    status
    shipping_status
    payment_status
    created_at
  }
`;
