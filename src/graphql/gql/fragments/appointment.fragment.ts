import { gql } from '@apollo/client';

export const APPOINTMENT_FRAGMENT = gql`
  fragment AppointmentFields on Appointment {
    name
    phone
    email
    title
    status
    created_at
  }
`;
