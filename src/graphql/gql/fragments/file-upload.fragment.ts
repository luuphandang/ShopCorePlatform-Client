import { gql } from '@apollo/client';

export const FILE_UPLOAD_FRAGMENT = gql`
  fragment FileUploadFields on FileUpload {
    name
    url
    created_at
  }
`;
