import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

export interface IProjectAcceptanceGetAllFilter extends IBaseFilter, IBasePagingFilter {
  customerUids?: string[];
  projectTypes?: string[];
  statusTypes?: string[];
  projectUid?: string;
  activeOnly?: boolean;
  status?: 'pending' | 'complete';
}