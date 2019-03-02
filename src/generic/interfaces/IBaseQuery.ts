export interface IBaseQuery {
  isExpired: boolean;
  isLoading: boolean;
  isError: boolean;
  errors?: any;
}