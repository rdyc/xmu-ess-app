import { IBasePagingFilter } from '@generic/interfaces';

interface IExtendedQuery extends IBasePagingFilter {}

export interface IMileageApprovalGetAllFilter {
  status?: string | undefined;
  isNotify?: boolean | undefined;
  companyUid?: string | undefined;
  positionUid: string | undefined;
  query?: IExtendedQuery | undefined;
}