import { gql } from '@apollo/client';

export const BOOKING_FRAGMENT = gql`
  fragment BookingFields on Booking {
    customer_id
    name
    phone
    email
    type
    estimated_date
    status
    created_at
  }
`;
