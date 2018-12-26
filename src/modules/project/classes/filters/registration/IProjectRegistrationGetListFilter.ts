import { IBasePagingFilter } from '@generic/interfaces';

export interface IProjectRegistrationGetListFilter extends IBasePagingFilter {
  activeOnly?: boolean | undefined;
  assignmentStatus?: 'assigned' | 'unassigned' | undefined;
  customerUids?: string[] | undefined;
  projectTypes?: string[] | undefined;
  statusTypes?: string[] | undefined;
}