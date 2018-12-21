import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBaseFilter, IBasePagingFilter {}

export interface ITravelApprovalgetAllFilter {
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  customerUid?: string | undefined;
  statusType?: string | undefined;
  status?: 'pending' | 'complete' | undefined;
  isNotify?: boolean | undefined;
  query?: IExtendedQuery | undefined;
}