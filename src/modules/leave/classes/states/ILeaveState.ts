import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveApprovalGetAllRequest,
  ILeaveApprovalGetByIdRequest,
  ILeaveApprovalPostRequest,
} from '@leave/classes/queries/approval';
import {
  ILeaveCancellationGetAllRequest,
  ILeaveCancellationGetByIdRequest,
  ILeaveCancellationPostRequest,
} from '@leave/classes/queries/cancellation';
import {
  ILeaveGetEndQuery,
  ILeaveRequestGetAllRequest,
  ILeaveRequestGetByIdRequest,
  ILeaveRequestPostRequest,
  ILeaveRequestPutRequest,
} from '@leave/classes/queries/request';
import { ILeave, ILeaveDetail, ILeaveGetEnd } from '@leave/classes/response';

export interface ILeaveState {
  // request
  leaveRequestGetAll: IQueryCollectionState<ILeaveRequestGetAllRequest, ILeave>;
  leaveRequestGetById: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveDetail>;
  leaveRequestPost: IQuerySingleState<ILeaveRequestPostRequest, ILeave>;
  leaveRequestPut: IQuerySingleState<ILeaveRequestPutRequest, ILeave>;

  // get end
  leaveGetEnd: IQuerySingleState<ILeaveGetEndQuery, ILeaveGetEnd>;

  // approval
  leaveApprovalGetAll: IQueryCollectionState<ILeaveApprovalGetAllRequest, ILeave>;
  leaveApprovalGetById: IQuerySingleState<ILeaveApprovalGetByIdRequest, ILeaveDetail>;
  leaveApprovalPost: IQuerySingleState<ILeaveApprovalPostRequest, ILeave>;

  // approval
  leaveCancellationGetAll: IQueryCollectionState<ILeaveCancellationGetAllRequest, ILeave>;
  leaveCancellationGetById: IQuerySingleState<ILeaveCancellationGetByIdRequest, ILeaveDetail>;
  leaveCancellationPost: IQuerySingleState<ILeaveCancellationPostRequest, ILeave>;
}
