import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IMileageRequestGetAllRequest,
  IMileageRequestGetByIdRequest,
  IMileageRequestPostRequest
} from '@mileage/classes/queries';
import {
  IMileageRequest,
  IMileageRequestDetail
} from '@mileage/classes/response';
import {
  mileageRequestGetAllDispose,
  mileageRequestGetAllRequest,
  mileageRequestGetByIdDispose,
  mileageRequestGetByIdRequest,
  mileageRequestPostDispose,
  mileageRequestPostRequest
} from '@mileage/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  mileageRequestState: {
    all: IQueryCollectionState<IMileageRequestGetAllRequest, IMileageRequest>;
    detail: IQuerySingleState<
    IMileageRequestGetByIdRequest,
    IMileageRequestDetail
    >;
  };
}

interface PropsFromDispatch {
  mileageRequestDispatch: {
    // command
    createRequest: typeof mileageRequestPostRequest;
    createDispose: typeof mileageRequestPostDispose;

    // query
    loadAllRequest: typeof mileageRequestGetAllRequest;
    loadAllDispose: typeof mileageRequestGetAllDispose;

    loadDetailRequest: typeof mileageRequestGetByIdRequest;
    loadDetailDispose: typeof mileageRequestGetByIdDispose;
  };
}

export interface WithMileageRequest
  extends PropsFromState,
    PropsFromDispatch {}

const mapStateToProps = ({
  mileageRequestGetAll, mileageRequestGetById
}: IAppState) => ({
  mileageRequestState: {
    all: mileageRequestGetAll,
    detail: mileageRequestGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mileageRequestDispatch: {
    // command
    createRequest: (request: IMileageRequestPostRequest) =>
      dispatch(mileageRequestPostRequest(request)),
    createDispose: () => dispatch(mileageRequestPostDispose()),

    // query
    loadAllRequest: (request: IMileageRequestGetAllRequest) =>
      dispatch(mileageRequestGetAllRequest(request)),
    loadAllDispose: () => dispatch(mileageRequestGetAllDispose()),

    loadDetailRequest: (request: IMileageRequestGetByIdRequest) =>
      dispatch(mileageRequestGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(mileageRequestGetByIdDispose())
  }
});

export const withMileageRequest = (component: React.ComponentType) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
