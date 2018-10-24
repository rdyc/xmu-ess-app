import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IMileageApprovalGetAllRequest, IMileageApprovalGetByIdRequest, IMileageApprovalPostRequest
} from '@mileage/classes/queries';
import {
  IMileageApproval, IMileageApprovalDetail
} from '@mileage/classes/response';
import {
  mileageapprovalGetAllDispose, mileageapprovalGetAllRequest, mileageapprovalGetByIdDispose, mileageapprovalGetByIdRequest, mileageapprovalPostDispose, mileageapprovalPostRequest
} from '@mileage/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  mileageApprovalState: {
    all: IQueryCollectionState<IMileageApprovalGetAllRequest, IMileageApproval>;
    detail: IQuerySingleState<
    IMileageApprovalGetByIdRequest,
    IMileageApprovalDetail
    >;
  };
}

interface PropsFromDispatch {
  mileageApprovalDispatch: {
    // command
    createRequest: typeof mileageapprovalPostRequest;
    createDispose: typeof mileageapprovalPostDispose;

    // query
    loadAllRequest: typeof mileageapprovalGetAllRequest;
    loadAllDispose: typeof mileageapprovalGetAllDispose;

    loadDetailRequest: typeof mileageapprovalGetByIdRequest;
    loadDetailDispose: typeof mileageapprovalGetByIdDispose;
  };
}

export interface WithMileageApproval
  extends PropsFromState,
    PropsFromDispatch {}

const mapStateToProps = ({
  mileageapprovalGetAll, mileageapprovalGetById
}: IAppState) => ({
  mileageApprovalState: {
    all: mileageapprovalGetAll,
    detail: mileageapprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mileageApprovalDispatch: {
    // command
    createRequest: (request: IMileageApprovalPostRequest) =>
      dispatch(mileageapprovalPostRequest(request)),
    createDispose: () => dispatch(mileageapprovalPostDispose()),

    // query
    loadAllRequest: (request: IMileageApprovalGetAllRequest) =>
      dispatch(mileageapprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(mileageapprovalGetAllDispose()),

    loadDetailRequest: (request: IMileageApprovalGetByIdRequest) =>
      dispatch(mileageapprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(mileageapprovalGetByIdDispose())
  }
});

export const withMileageApproval = (component: React.ComponentType) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
