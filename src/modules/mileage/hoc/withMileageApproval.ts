import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IMileageApprovalGetAllRequest, IMileageApprovalGetByIdRequest, IMileageApprovalPostRequest
} from '@mileage/classes/queries';
import {
  IMileageRequest, IMileageRequestDetail
} from '@mileage/classes/response';
import {
  mileageApprovalGetAllDispose, mileageApprovalGetAllRequest, mileageApprovalGetByIdDispose, mileageApprovalGetByIdRequest, mileageApprovalPostDispose, mileageApprovalPostRequest
} from '@mileage/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { submit } from 'redux-form';

interface PropsFromState {
  mileageApprovalState: {
    all: IQueryCollectionState<IMileageApprovalGetAllRequest, IMileageRequest>;
    detail: IQuerySingleState<
    IMileageApprovalGetByIdRequest,
    IMileageRequestDetail
    >;
  };
}

interface PropsFromDispatch {
  mileageApprovalDispatch: {
    // command
    createRequest: typeof mileageApprovalPostRequest;
    createDispose: typeof mileageApprovalPostDispose;

    // query
    loadAllRequest: typeof mileageApprovalGetAllRequest;
    loadAllDispose: typeof mileageApprovalGetAllDispose;

    loadDetailRequest: typeof mileageApprovalGetByIdRequest;
    loadDetailDispose: typeof mileageApprovalGetByIdDispose;
  };
  workflowApprovalDispatch: {
    submitForm: (formName: string) => void;
  };
}

export interface WithMileageApproval
  extends PropsFromState,
    PropsFromDispatch {}

const mapStateToProps = ({
  mileageApprovalGetAll, mileageApprovalGetById
}: IAppState) => ({
  mileageApprovalState: {
    all: mileageApprovalGetAll,
    detail: mileageApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mileageApprovalDispatch: {
    // command
    createRequest: (request: IMileageApprovalPostRequest) =>
      dispatch(mileageApprovalPostRequest(request)),
    createDispose: () => dispatch(mileageApprovalPostDispose()),

    // query
    loadAllRequest: (request: IMileageApprovalGetAllRequest) =>
      dispatch(mileageApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(mileageApprovalGetAllDispose()),

    loadDetailRequest: (request: IMileageApprovalGetByIdRequest) =>
      dispatch(mileageApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(mileageApprovalGetByIdDispose())
  },
  workflowApprovalDispatch: {
    submitForm: (formName: string) => dispatch(submit(formName))
  }
});

export const withMileageApproval = (component: React.ComponentType) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
