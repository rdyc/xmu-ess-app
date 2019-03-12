import { IBasePagingFilter } from '@generic/interfaces';

export interface IProjectRegistrationGetListFilter extends IBasePagingFilter {
  companyUid?: string;
  activeOnly?: boolean;
  assignmentStatus?: 'assigned' | 'unassigned';
  customerUids?: string;
  projectTypes?: string;
  statusTypes?: string;
}