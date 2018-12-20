import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface IProjectAcceptanceGetAllFilter {
  customerUids?: string[];
  projectTypes?: string[];
  statusTypes?: string[];
  projectUid?: string;
  activeOnly?: boolean;
  status?: 'pending' | 'complete';
  query?: IExtendedQuery;
}