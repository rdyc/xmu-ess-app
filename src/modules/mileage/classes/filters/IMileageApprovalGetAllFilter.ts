import { IBasePagingFilter } from '@generic/interfaces';

export interface IMileageApprovalGetAllFilter extends IBasePagingFilter {
  year?: number;
  month?: number;
  employeeUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isNotify?: boolean;
  companyUid?: string;
  positionUid?: string;
}