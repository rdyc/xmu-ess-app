import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface IProjectAcceptanceGetAllFilter {
  status?: 'pending' | 'complete' | undefined;
  query?: IExtendedQuery | undefined;
}