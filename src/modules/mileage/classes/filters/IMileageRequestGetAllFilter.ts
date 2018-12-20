import { IBasePagingFilter } from '@generic/interfaces';

export interface IMileageRequestGetAllFilter extends IBasePagingFilter {
  year?: number;
  month?: number;
  employeeUid?: string;
  isRejected?: boolean;
  statusType?: string;
}