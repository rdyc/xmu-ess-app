import { IBaseFilter, IBasePagingFilter } from '@generic/interfaces';

export interface IProjectAssignmentGetAllFilter extends IBaseFilter, IBasePagingFilter {
  customerUids?: string[] | undefined;
  projectTypes?: string[] | undefined;
  statusTypes?: string[] | undefined;
  projectUid?: string | undefined;
}