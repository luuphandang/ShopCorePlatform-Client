import { gql } from '@apollo/client';

import {
  APPOINTMENT_FRAGMENT,
  FILE_UPLOAD_FRAGMENT,
  METADATA_FRAGMENT,
  USER_FRAGMENT,
} from '@/graphql/gql/fragments';

export const APPOINTMENT = gql`
  query Appointment($query: GetOneInput) {
    appointment(query: $query) {
      ...AppointmentFields
      id
      code
      content
      attachments {
        ...FileUploadFields
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
  ${APPOINTMENT_FRAGMENT}
  ${USER_FRAGMENT}
  ${FILE_UPLOAD_FRAGMENT}
`;

export const APPOINTMENTS = gql`
  query Appointments($query: GetManyInput) {
    appointments(query: $query) {
      data {
        ...AppointmentFields
        id
        code
        content
        creator {
          ...UserFields
        }
      }
      metadata {
        ...MetadataFields
      }
    }
  }
  ${APPOINTMENT_FRAGMENT}
  ${METADATA_FRAGMENT}
  ${USER_FRAGMENT}
`;
