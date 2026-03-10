import { gql } from '@apollo/client';

export const BLOG_FRAGMENT = gql`
  fragment BlogFields on Blog {
    title
    short_description
    meta_title
    meta_description
    meta_keywords
    meta_robots
    created_at
  }
`;
