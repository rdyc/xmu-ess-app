import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveApprovalGetAllRequest,
  ILeaveApprovalGetByIdRequest,
  ILeaveApprovalPostRequest,
} from '@leave/classes/queries/approval';
import {
  ILeaveRequestGetAllRequest,
  ILeaveRequestGetByIdRequest,
  ILeaveRequestPostRequest,
  ILeaveRequestPutRequest,
} from '@leave/classes/queries/request';
import { ILeaveRequest, ILeaveRequestDetail } from '@leave/classes/response';

export interface ILeaveState {
  // request
  leaveRequestGetAll: IQueryCollectionState<ILeaveRequestGetAllRequest, ILeaveRequest>;
  leaveRequestGetById: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
  leaveRequestPost: IQuerySingleState<ILeaveRequestPostRequest, ILeaveRequest>;
  leaveRequestPut: IQuerySingleState<ILeaveRequestPutRequest, ILeaveRequest>;

  // approval
  leaveApprovalGetAll: IQueryCollectionState<ILeaveApprovalGetAllRequest, ILeaveRequest>;
  leaveApprovalGetById: IQuerySingleState<ILeaveApprovalGetByIdRequest, ILeaveRequestDetail>;
  leaveApprovalPost: IQuerySingleState<ILeaveApprovalPostRequest, ILeaveRequest>;
}