import {
  Appointment,
  Booking,
  FileUpload,
  JwtWithUser,
  Order,
  SignInInput,
  SignUpInput,
  User,
} from '../@types/graphql.type';
import { IAuthProps } from '../interfaces/abstract.interface';
import { ICreateAppointmentProps } from '../interfaces/appointment.interface';
import {
  IAddToCartProps,
  ICheckoutCartProps,
  IRemoveFromCartProps,
} from '../interfaces/cart.interface';
import { ICreateFileProps, IUploadFileProps } from '../interfaces/file-upload.interface';
import { IUpdateUserProps } from '../interfaces/user.interface';
import { ICreateBookingProps } from './booking.interface';

export interface IAppointmentMutation {
  createAppointment: (props: IAuthProps & ICreateAppointmentProps) => Promise<Appointment | null>;
}

export interface IAuthMutation {
  signUp: (props: SignUpInput) => Promise<JwtWithUser | null>;
  signIn: (props: SignInInput) => Promise<JwtWithUser | null>;
  signOut: () => Promise<boolean>;
  refreshToken: () => Promise<JwtWithUser | null>;
}

export interface IBookingMutation {
  createBooking: (props: IAuthProps & ICreateBookingProps) => Promise<Booking | null>;
}

export interface ICartMutation {
  initialize: (props: IAuthProps) => Promise<Order | null>;
  addProduct: (props: IAuthProps & IAddToCartProps) => Promise<Order | null>;
  removeProduct: (props: IAuthProps & IRemoveFromCartProps) => Promise<Order | null>;
  checkout: (props: IAuthProps & ICheckoutCartProps) => Promise<Order | null>;
}

export interface IFileUploadMutation {
  createFile: (props: IAuthProps & ICreateFileProps) => Promise<FileUpload | null>;
  uploadFile: (props: IAuthProps & IUploadFileProps) => Promise<FileUpload | null>;
}

export interface IUserMutation {
  updateUser: (props: IAuthProps & IUpdateUserProps) => Promise<User | null>;
}
