import { IBasePagingFilter } from '@generic/interfaces';

export interface IMileageApprovalGetAllFilter extends IBasePagingFilter {
  status: string;
  isNotify: boolean;
  companyUid: string;
  positionUid: string;
}