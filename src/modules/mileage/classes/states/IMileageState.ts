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
  mileageRequestGetAll: IQueryCollectionState<
    IMileageRequestGetAllRequest,
    IMileageRequest
  >;
  mileageRequestGetById: IQuerySingleState<
    IMileageRequestGetByIdRequest,
    IMileageRequestDetail
  >;
  mileageRequestPost: IQuerySingleState<IMileageRequestPostRequest, IMileageRequest>;

  mileageApprovalGetAll: IQueryCollectionState<
    IMileageApprovalGetAllRequest,
    IMileageApproval
  >;
  mileageApprovalGetById: IQuerySingleState<
    IMileageApprovalGetByIdRequest,
    IMileageApprovalDetail
  >;
  mileageApprovalPost: IQuerySingleState<IMileageApprovalPostRequest, IMileageApproval>;
}
