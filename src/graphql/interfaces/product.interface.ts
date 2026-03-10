import { CreateProductInput, UpdateProductInput } from '../@types/graphql.type';

export interface ICreateProductProps {
  data: CreateProductInput;
}

export interface IUpdateProductProps {
  id: number;
  data: UpdateProductInput;
}
