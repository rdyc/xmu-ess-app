import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveRequestGetAllRequest,
  ILeaveRequestGetByIdRequest,
  ILeaveRequestPostRequest,
  ILeaveRequestPutRequest,
} from '@leave/classes/queries';
import { ILeaveRequest, ILeaveRequestDetail } from '@leave/classes/response';

export interface ILeaveRequestState {
  leaveRequestGetAll: IQueryCollectionState<ILeaveRequestGetAllRequest, ILeaveRequest>;
  leaveRequestGetById: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
  leaveRequestPost: IQuerySingleState<ILeaveRequestPostRequest, ILeaveRequest>;
  leaveRequestPut: IQuerySingleState<ILeaveRequestPutRequest, ILeaveRequest>;
}