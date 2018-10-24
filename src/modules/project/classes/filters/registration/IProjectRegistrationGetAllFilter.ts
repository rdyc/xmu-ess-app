import { IBasePagingFilter } from '@generic/interfaces';

export interface IProjectRegistrationGetAllFilter extends IBasePagingFilter {
  readonly customerUids: string[] | undefined;
  readonly projectTypes: string[] | undefined;
  readonly statusTypes: string[] | undefined;
}