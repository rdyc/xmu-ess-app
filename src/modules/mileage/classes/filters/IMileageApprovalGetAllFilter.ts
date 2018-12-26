import { IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBasePagingFilter {}

export interface IMileageApprovalGetAllFilter {
  year?: number;
  month?: number;
  employeeUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isNotify?: boolean;
  companyUid?: string;
  positionUid?: string;
  query?: IExtendedQuery;
}