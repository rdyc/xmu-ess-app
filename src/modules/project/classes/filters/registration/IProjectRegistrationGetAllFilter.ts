import { IBasePagingFilter } from '@generic/interfaces';

export interface IProjectRegistrationGetAllFilter extends IBasePagingFilter {
  // customerUids?: string[] | undefined;
  // projectTypes?: string[] | undefined;
  // statusTypes?: string[] | undefined;
  status?: string;
  isRejected?: boolean;
  isNewOwner?: boolean;
}