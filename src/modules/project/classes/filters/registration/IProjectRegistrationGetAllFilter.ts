import { IBasePagingFilter } from '@generic/interfaces';

export interface IProjectRegistrationGetAllFilter extends IBasePagingFilter {
  customerUid?: string;
  projectType?: string;
  projectTypes?: string;
  statusType?: string;
  statusTypes?: string;
  status?: 'pending' | 'complete' | string;
  isRejected?: boolean;
  isNewOwner?: boolean;
}