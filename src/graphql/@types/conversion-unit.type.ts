import { ConversionUnitQuery, ConversionUnitsQuery } from './graphql.type';

export type TConversionUnitQuery = ConversionUnitQuery['conversionUnit'];

export type TConversionUnitsQuery = ConversionUnitsQuery['conversionUnits']['data'];
