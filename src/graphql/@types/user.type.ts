import { CreateUserMutation, UpdateUserMutation, UserQuery, UsersQuery } from './graphql.type';

export type TUserQuery = UserQuery['user'];

export type TUsersQuery = UsersQuery['users']['data'];

export type TCreateUserMutation = CreateUserMutation['createUser'];

export type TUpdateUserMutation = UpdateUserMutation['updateUser'];
