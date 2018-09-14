export interface IBaseQuery {
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly errors: any | undefined;
}