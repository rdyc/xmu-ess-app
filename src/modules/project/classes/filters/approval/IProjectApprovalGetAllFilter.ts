import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface IProjectApprovalGetAllFilter {
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  status?: 'pending' | 'complete' | undefined;
  isNotify?: boolean | undefined;
  query?: IExtendedQuery | undefined;
}