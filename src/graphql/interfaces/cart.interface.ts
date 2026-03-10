import { AddToCartInput, CheckoutCartInput, RemoveFromCartInput } from '../@types/graphql.type';

export interface IAddToCartProps {
  cartCode: string;
  data: AddToCartInput;
}

export interface IRemoveFromCartProps {
  cartCode: string;
  data: RemoveFromCartInput;
}

export interface ICheckoutCartProps {
  cartCode: string;
  checkoutData: CheckoutCartInput;
}
