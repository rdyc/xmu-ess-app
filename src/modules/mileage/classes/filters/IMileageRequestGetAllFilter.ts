import { IBasePagingFilter } from '@generic/interfaces';

export interface IMileageRequestGetAllFilter extends IBasePagingFilter {
  year?: number | undefined;
  month?: number | undefined;
  isRejected?: boolean | undefined;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
}