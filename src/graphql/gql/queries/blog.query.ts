import { gql } from '@apollo/client';

import {
  BLOG_FRAGMENT,
  CATEGORY_FRAGMENT,
  METADATA_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const BLOG = gql`
  query Blog($query: GetOneInput) {
    blog(query: $query) {
      ...BlogFields
      id
      code
      content
      categories {
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
  ${BLOG_FRAGMENT}
  ${USER_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const BLOGS = gql`
  query Blogs($query: GetManyInput) {
    blogs(query: $query) {
      data {
        ...BlogFields
        id
        code
        content
        categories {
          ...CategoryFields
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
  ${BLOG_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;
