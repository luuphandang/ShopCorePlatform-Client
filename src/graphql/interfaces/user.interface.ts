import { UpdateUserInput } from '../@types/graphql.type';

export interface IUpdateUserProps {
  id: number;
  data: Omit<UpdateUserInput, 'id' | 'roles'>;
}
