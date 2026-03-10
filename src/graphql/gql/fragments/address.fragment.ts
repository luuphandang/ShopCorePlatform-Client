import { gql } from '@apollo/client';

export const ADDRESS_FRAGMENT = gql`
  fragment AddressFields on Address {
    name
    phone
    email
    address
    is_default
    created_at
  }
`;
