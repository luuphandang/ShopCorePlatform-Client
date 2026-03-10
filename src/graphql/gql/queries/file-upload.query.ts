import { gql } from '@apollo/client';

import { FILE_UPLOAD_FRAGMENT, METADATA_FRAGMENT, USER_FRAGMENT } from '@/graphql/gql/fragments';

export const FILE_UPLOAD = gql`
  query FileUpload($query: GetOneInput) {
    file(query: $query) {
      ...FileUploadFields
      id
      code
      type
      size
      status
      owner {
        ...UserFields
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
  ${FILE_UPLOAD_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const FILE_UPLOADS = gql`
  query FileUploads($query: GetManyInput) {
    files(query: $query) {
      data {
        ...FileUploadFields
        id
        code
        type
        size
        status
        owner {
          ...UserFields
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
  ${FILE_UPLOAD_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
`;
