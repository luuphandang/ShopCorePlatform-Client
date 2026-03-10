import { CreateUnitInput, UpdateUnitInput } from '../@types/graphql.type';

export interface ICreateUnitProps {
  data: CreateUnitInput;
}

export interface IUpdateUnitProps {
  id: number;
  data: UpdateUnitInput;
}
