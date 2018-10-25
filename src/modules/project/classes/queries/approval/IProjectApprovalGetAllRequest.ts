import { IProjectApprovalGetAllFilter } from '@project/classes/filters/approval';

export interface IProjectApprovalGetAllRequest {
  filter?: IProjectApprovalGetAllFilter | undefined;
}