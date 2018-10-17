import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IMileageApprovalGetAllRequest,
  IMileageApprovalGetByIdRequest,
  IMileageApprovalPostRequest,
  IMileageRequestGetAllRequest,
  IMileageRequestGetByIdRequest,
  IMileageRequestPostRequest,
} from '@mileage/classes/queries';
import {
  IMileageApproval,
  IMileageApprovalDetail,
  IMileageRequest,
  IMileageRequestDetail
} from '@mileage/classes/response';

export interface IMileageState {
  mileagerequestGetAll: IQueryCollectionState<
    IMileageRequestGetAllRequest,
    IMileageRequest
  >;
  mileagerequestGetById: IQuerySingleState<
    IMileageRequestGetByIdRequest,
    IMileageRequestDetail
  >;
  mileagerequestPost: IQuerySingleState<IMileageRequestPostRequest, IMileageRequest>;

  mileageapprovalGetAll: IQueryCollectionState<
    IMileageApprovalGetAllRequest,
    IMileageApproval
  >;
  mileageapprovalGetById: IQuerySingleState<
    IMileageApprovalGetByIdRequest,
    IMileageApprovalDetail
  >;
  mileageapprovalPost: IQuerySingleState<IMileageApprovalPostRequest, IMileageApproval>;
}
