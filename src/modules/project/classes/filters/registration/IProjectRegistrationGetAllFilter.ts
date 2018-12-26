import { IBasePagingFilter } from '@generic/interfaces';

export interface IProjectRegistrationGetAllFilter extends IBasePagingFilter {
  // customerUids?: string[] | undefined;
  // projectTypes?: string[] | undefined;
  // statusTypes?: string[] | undefined;
  customerUid?: string;
  projectType?: string;
  statusType?: string;
  status?: 'pending' | 'complete' | string;
  isRejected?: boolean;
  isNewOwner?: boolean;
}