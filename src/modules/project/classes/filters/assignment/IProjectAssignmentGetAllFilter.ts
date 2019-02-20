import { IBasePagingFilter } from '@generic/interfaces';

export interface IProjectAssignmentGetAllFilter extends IBasePagingFilter {
  customerUids?: string;
  projectTypes?: string;
  statusTypes?: string;
  projectUid?: string;
}