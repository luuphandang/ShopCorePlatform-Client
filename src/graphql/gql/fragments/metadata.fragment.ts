import { gql } from '@apollo/client';

export const METADATA_FRAGMENT = gql`
  fragment MetadataFields on MetadataResponse {
    current_page
    page_size
    total_items
    total_pages
  }
`;
