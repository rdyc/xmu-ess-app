import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

export interface IProjectAssignmentGetAllFilter extends IBaseFilter, IBasePagingFilter {
  customerUids?: string[];
  projectTypes?: string[];
  statusTypes?: string[];
  projectUid?: string;
}