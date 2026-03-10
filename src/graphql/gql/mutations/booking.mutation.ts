import { gql } from '@apollo/client';

import { BOOKING_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_BOOKING = gql`
  mutation CreateBooking($data: CreateBookingInput!) {
    createBooking(data: $data) {
      ...BookingFields
      category_ids
      product_ids
      attachment_ids
    }
  }
  ${BOOKING_FRAGMENT}
`;
