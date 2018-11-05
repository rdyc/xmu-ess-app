import { ILeaveApprovalGetAllFilter } from '@leave/classes/filters/approval';

export interface ILeaveApprovalGetAllRequest {
  filter?: ILeaveApprovalGetAllFilter | undefined;
}