import { IBasePagingFilter } from '@generic/interfaces';

export interface IProjectAcceptanceGetAllFilter extends IBasePagingFilter {
  customerUids?: string;
  projectTypes?: string;
  statusTypes?: string;
  projectUid?: string;
  activeOnly?: boolean;
  status?: 'pending' | 'complete';
}