import { IBasePagingFilter } from '@generic/interfaces';

<<<<<<< HEAD
interface IExtendedQuery extends IBasePagingFilter {}

export interface IMileageApprovalGetAllFilter {
  status?: string | undefined;
  isNotify?: boolean | undefined;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  query?: IExtendedQuery | undefined;
=======
export interface IMileageApprovalGetAllFilter extends IBasePagingFilter {
  year?: number;
  month?: number;
  employeeUid?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isNotify?: boolean;
  companyUid?: string;
  positionUid?: string;
>>>>>>> origin/develop
}