import { CreateConversionUnitInput, UpdateConversionUnitInput } from '../@types/graphql.type';

export interface ICreateConversionUnitProps {
  data: CreateConversionUnitInput;
}

export interface IUpdateConversionUnitProps {
  id: number;
  data: UpdateConversionUnitInput;
}
