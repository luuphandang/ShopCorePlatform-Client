import { gql } from '@apollo/client';

export const ORDER_HISTORY_FRAGMENT = gql`
  fragment OrderHistoryFields on OrderHistory {
    status
    shipping_status
    created_at
  }
`;
