import { IBasePagingFilter } from '@generic/interfaces';

export interface IMileageRequestGetAllFilter extends IBasePagingFilter {
  year?: number;
  month?: number;
  isRejected?: boolean;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  companyUid?: string;
  positionUid?: string;
}