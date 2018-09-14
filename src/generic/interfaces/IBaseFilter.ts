import { SortDirection } from '@generic/types';

export interface IBaseFilter<T> {
  readonly find: string | undefined;
  readonly findBy: T | undefined;
  readonly orderBy: T | undefined;
  readonly direction: SortDirection | undefined;
  readonly page: number | undefined;
  readonly size: number | undefined;
}