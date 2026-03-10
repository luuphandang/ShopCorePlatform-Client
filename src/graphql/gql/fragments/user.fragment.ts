import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    phone
    first_name
    last_name
    email
    birthday
    address
    created_at
  }
`;
