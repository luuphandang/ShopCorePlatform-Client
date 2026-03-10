import { UnitQuery, UnitsQuery } from './graphql.type';

export type TUnitQuery = UnitQuery['unit'];

export type TUnitsQuery = UnitsQuery['units']['data'];
