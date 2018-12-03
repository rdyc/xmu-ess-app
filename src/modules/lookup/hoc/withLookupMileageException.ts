import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest,
  IMileageExceptionPostRequest,
  IMileageExceptionPutRequest
} from '@lookup/classes/queries';
import {
  IMileageException,
  IMileageExceptionDetail,
  IMileageExceptionList
} from '@lookup/classes/response';
import {
  mileageExceptionGetAllDispose,
  mileageExceptionGetAllRequest,
  mileageExceptionGetByIdDispose,
  mileageExceptionGetByIdRequest,
  mileageExceptionGetListDispose,
  mileageExceptionGetListRequest,
  mileageExceptionPostDispose,
  mileageExceptionPostRequest,
  mileageExceptionPutDispose,
  mileageExceptionPutRequest
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  mileageExceptionState: {
    all: IQueryCollectionState<IMileageExceptionAllRequest, IMileageException>;
    list: IQueryCollectionState<IMileageExceptionListRequest, IMileageExceptionList>;
    detail: IQuerySingleState<IMileageExceptionByIdRequest, IMileageExceptionDetail>;
  };
}

interface PropsFromDispatch {
  mileageExceptionDispatch: {
    // command
    createRequest: typeof mileageExceptionPostRequest;
    createDispose: typeof mileageExceptionPostDispose;

    updateRequest: typeof mileageExceptionPutRequest;
    updateDispose: typeof mileageExceptionPutDispose;

    // query
    loadAllRequest: typeof mileageExceptionGetAllRequest;
    loadAllDispose: typeof mileageExceptionGetAllDispose;

    loadListRequest: typeof mileageExceptionGetListRequest;
    loadListDispose: typeof mileageExceptionGetListDispose;

    loadDetailRequest: typeof mileageExceptionGetByIdRequest;
    loadDetailDispose: typeof mileageExceptionGetByIdDispose;
  };
}

export interface WithLookupMileageException extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ mileageExceptionGetAll, mileageExceptionGetById, mileageExceptionGetList }: IAppState) => ({
  mileageExceptionState: {
    all: mileageExceptionGetAll,
    list: mileageExceptionGetList,
    detail: mileageExceptionGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mileageExceptionDispatch: {
    // command
    createRequest: (request: IMileageExceptionPostRequest) => dispatch(mileageExceptionPostRequest(request)),
    createDispose: () => dispatch(mileageExceptionPostDispose()),

    updateRequest: (request: IMileageExceptionPutRequest) => dispatch(mileageExceptionPutRequest(request)), 
    updateDispose: () => dispatch(mileageExceptionPutDispose()),

    // query
    loadAllRequest: (request: IMileageExceptionAllRequest) => dispatch(mileageExceptionGetAllRequest(request)),
    loadAllDispose: () => dispatch(mileageExceptionGetAllDispose()),

    loadListRequest: (request: IMileageExceptionListRequest) => dispatch(mileageExceptionGetListRequest(request)),
    loadListDispose: () => dispatch(mileageExceptionGetListDispose()),

    loadDetailRequest: (request: IMileageExceptionByIdRequest) => dispatch(mileageExceptionGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(mileageExceptionGetByIdDispose())
  }
});

export const withLookupMileageException = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);