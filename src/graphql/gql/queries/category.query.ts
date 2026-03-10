import { gql } from '@apollo/client';

import {
  CATEGORY_FRAGMENT,
  FILE_UPLOAD_FRAGMENT,
  METADATA_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const CATEGORY = gql`
  query Category($query: GetOneInput) {
    category(query: $query) {
      ...CategoryFields
      id
      code
      short_description
      description
      keywords
      thumbnail {
        ...FileUploadFields
      }
      children {
        ...CategoryFields
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
  ${CATEGORY_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const CATEGORIES = gql`
  query Categories($query: GetManyInput) {
    categories(query: $query) {
      data {
        ...CategoryFields
        id
        code
        short_description
        description
        keywords
        children {
          ...CategoryFields
          id
          code
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
  ${CATEGORY_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
`;
