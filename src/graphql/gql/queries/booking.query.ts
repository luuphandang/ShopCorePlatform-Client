import { gql } from '@apollo/client';

import {
  BOOKING_FRAGMENT,
  CATEGORY_FRAGMENT,
  METADATA_FRAGMENT,
  PRODUCT_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const BOOKING = gql`
  query Booking($query: GetOneInput) {
    booking(query: $query) {
      ...BookingFields
      id
      code
      type
      content
      customer {
        ...UserFields
      }
      categories {
        ...CategoryFields
      }
      products {
        ...ProductFields
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
  ${BOOKING_FRAGMENT}
  ${USER_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const BOOKINGS = gql`
  query Bookings($query: GetManyInput) {
    bookings(query: $query) {
      data {
        ...BookingFields
        id
        code
        type
        customer {
          ...UserFields
        }
        categories {
          ...CategoryFields
        }
        products {
          ...ProductFields
        }
        creator {
          ...UserFields
        }
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${BOOKING_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;
