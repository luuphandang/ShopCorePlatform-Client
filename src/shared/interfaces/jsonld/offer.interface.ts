import { EJsonldType } from '@/shared/enums/jsonld.enum';

import { IAbstractJsonld } from './abstract.interface';

export interface IOfferJsonld extends IAbstractJsonld {
  '@type': EJsonldType.OFFER;
  priceCurrency: string;
  price: string;
  availability: string;
  url: string;
  hasMerchantReturnPolicy: IHasMerchantReturnPolicyJsonld;
  shippingDetails: IOfferShippingDetailsJsonld;
}

export interface IHasMerchantReturnPolicyJsonld {
  '@type': EJsonldType.OFFER;
  applicableCountry: string;
  returnPolicyCategory: string;
  merchantReturnDays: number;
  returnMethod: string;
  returnFees: string;
}

export interface IOfferShippingDetailsJsonld {
  '@type': 'OfferShippingDetails';
  shippingRate: IOfferShippingDetailsShippingRateJsonld;
  shippingDestination: IOfferShippingDetailsShippingDestinationJsonld;
  deliveryTime: IOfferShippingDetailsDeliveryTimeJsonld;
}

export interface IOfferShippingDetailsShippingRateJsonld {
  '@type': 'MonetaryAmount';
  currency: string;
  value: string;
}

export interface IOfferShippingDetailsShippingDestinationJsonld {
  '@type': 'DefinedRegion';
  addressCountry: string;
}

export interface IOfferShippingDetailsDeliveryTimeJsonld {
  '@type': 'ShippingDeliveryTime';
  handlingTime: IDeliveryTimeHandlingTimeJsonld;
  transitTime: IDeliveryTimeTransitTimeJsonld;
}

export interface IDeliveryTimeHandlingTimeJsonld {
  '@type': 'QuantitativeValue';
  minValue: number;
  maxValue: number;
  unitCode: string;
}

export interface IDeliveryTimeTransitTimeJsonld {
  '@type': 'QuantitativeValue';
  minValue: number;
  maxValue: number;
  unitCode: string;
}
