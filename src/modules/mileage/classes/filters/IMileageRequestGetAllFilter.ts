import { IBasePagingFilter } from '@generic/interfaces';

export interface IMileageRequestGetAllFilter extends IBasePagingFilter {
  year: number;
  month: number;
  isRejected: boolean;
  companyUid: string;
  positionUid: string;
}