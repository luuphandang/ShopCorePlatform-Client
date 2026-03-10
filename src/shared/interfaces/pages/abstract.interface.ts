export interface IAbstractSearchParams {
  page?: string | null;
  limit?: string | null;
}

export interface IServerPageProps<T, V extends IAbstractSearchParams> {
  params: Promise<T>;
  searchParams: Promise<V>;
}
