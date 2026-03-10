import { gql } from '@apollo/client';

import { FILE_UPLOAD_FRAGMENT } from '@/graphql/gql/fragments';

export const WEBSITE_SIGNED_URL = gql`
  mutation WebsiteSignedUrl($data: SignedUrlInput!) {
    websiteSignedUrl(data: $data) {
      file_upload {
        ...FileUploadFields
        id
        code
      }
      signed_url
    }
  }
  ${FILE_UPLOAD_FRAGMENT}
`;

export const UPLOAD_FILE = gql`
  mutation CreateFile($data: CreateFileUploadInput!) {
    createFile(data: $data) {
      ...FileUploadFields
    }
  }
  ${FILE_UPLOAD_FRAGMENT}
`;

export const UPDATE_FILE = gql`
  mutation UpdateFile($id: Int!, $data: UpdateFileUploadInput!) {
    updateFile(id: $id, data: $data) {
      ...FileUploadFields
      id
      code
      slug
      type
      status
      owner_by
    }
  }
  ${FILE_UPLOAD_FRAGMENT}
`;
