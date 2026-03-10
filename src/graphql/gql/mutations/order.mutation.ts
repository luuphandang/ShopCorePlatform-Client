import { gql } from '@apollo/client';

import { ORDER_DETAIL_FRAGMENT, ORDER_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_ORDER = gql`
  mutation CreateOrder($data: CreateOrderInput!) {
    createOrder(data: $data) {
      ...OrderFields
      order_details {
        ...OrderDetailFields
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: Int!, $data: UpdateOrderInput!) {
    updateOrder(id: $id, data: $data) {
      ...OrderFields
      order_details {
        ...OrderDetailFields
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_DETAIL_FRAGMENT}
`;
