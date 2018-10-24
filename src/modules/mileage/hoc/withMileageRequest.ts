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
  mileagerequestGetAllDispose,
  mileagerequestGetAllRequest,
  mileagerequestGetByIdDispose,
  mileagerequestGetByIdRequest,
  mileagerequestPostDispose,
  mileagerequestPostRequest
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
    createRequest: typeof mileagerequestPostRequest;
    createDispose: typeof mileagerequestPostDispose;

    // query
    loadAllRequest: typeof mileagerequestGetAllRequest;
    loadAllDispose: typeof mileagerequestGetAllDispose;

    loadDetailRequest: typeof mileagerequestGetByIdRequest;
    loadDetailDispose: typeof mileagerequestGetByIdDispose;
  };
}

export interface WithMileageRequest
  extends PropsFromState,
    PropsFromDispatch {}

const mapStateToProps = ({
  mileagerequestGetAll, mileagerequestGetById
}: IAppState) => ({
  mileageRequestState: {
    all: mileagerequestGetAll,
    detail: mileagerequestGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mileageRequestDispatch: {
    // command
    createRequest: (request: IMileageRequestPostRequest) =>
      dispatch(mileagerequestPostRequest(request)),
    createDispose: () => dispatch(mileagerequestPostDispose()),

    // query
    loadAllRequest: (request: IMileageRequestGetAllRequest) =>
      dispatch(mileagerequestGetAllRequest(request)),
    loadAllDispose: () => dispatch(mileagerequestGetAllDispose()),

    loadDetailRequest: (request: IMileageRequestGetByIdRequest) =>
      dispatch(mileagerequestGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(mileagerequestGetByIdDispose())
  }
});

export const withMileageRequest = (component: React.ComponentType) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
