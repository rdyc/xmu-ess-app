import { IQueryCollectionState, IQuerySingleState, IResponseSingle } from '@generic/interfaces';
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
import { ILeaveGetEnd, ILeaveRequest, ILeaveRequestDetail } from '@leave/classes/response';

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

  // approval
  leaveCancellationGetAll: IQueryCollectionState<ILeaveCancellationGetAllRequest, ILeaveRequest>;
  leaveCancellationGetById: IQuerySingleState<ILeaveCancellationGetByIdRequest, ILeaveRequestDetail>;
  leaveCancellationPost: IQuerySingleState<ILeaveCancellationPostRequest, ILeaveRequest>;
}

export interface ILeaveGetEndState {
    // get end
    readonly result: IResponseSingle<ILeaveGetEnd> | undefined;
    readonly parameter: ILeaveGetEndQuery | undefined;
    readonly loading: boolean;
    readonly errors?: string | null;
}
