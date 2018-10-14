import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveRequestGetAllRequest,
  ILeaveRequestGetByIdRequest,
  ILeaveRequestPostRequest,
  ILeaveRequestPutRequest,
} from '@leave/classes/queries';
import { ILeaveRequest, ILeaveRequestDetail } from '@leave/classes/response';

export interface ILeaveRequestState {
  projectGetAll: IQueryCollectionState<ILeaveRequestGetAllRequest, ILeaveRequest>;
  projectGetById: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
  projectPost: IQuerySingleState<ILeaveRequestPostRequest, ILeaveRequest>;
  projectPut: IQuerySingleState<ILeaveRequestPutRequest, ILeaveRequest>;
}