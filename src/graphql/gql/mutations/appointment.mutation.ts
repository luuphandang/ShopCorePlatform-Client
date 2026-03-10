import { gql } from '@apollo/client';

import { APPOINTMENT_FRAGMENT } from '@/graphql/gql/fragments';

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($data: CreateAppointmentInput!) {
    createAppointment(data: $data) {
      ...AppointmentFields
    }
  }
  ${APPOINTMENT_FRAGMENT}
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment($id: Int!, $data: UpdateAppointmentInput!) {
    updateAppointment(id: $id, data: $data) {
      ...AppointmentFields
    }
  }
  ${APPOINTMENT_FRAGMENT}
`;
