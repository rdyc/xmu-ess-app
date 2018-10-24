import { IBaseQueryPagingFilter } from '@generic/interfaces';

export interface IMileageApprovalGetAllFilter extends IBaseQueryPagingFilter {
  status?: string | undefined;
  isNotify?: boolean | undefined;
  companyUid?: string | undefined;
  positionUid: string | undefined;
}