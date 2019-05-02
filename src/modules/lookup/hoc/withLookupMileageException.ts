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
  lookupMileageExceptionGetAllDispose,
  lookupMileageExceptionGetAllRequest,
  lookupMileageExceptionGetByIdDispose,
  lookupMileageExceptionGetByIdRequest,
  lookupMileageExceptionGetListDispose,
  lookupMileageExceptionGetListRequest,
  lookupMileageExceptionPostDispose,
  lookupMileageExceptionPostRequest,
  lookupMileageExceptionPutDispose,
  lookupMileageExceptionPutRequest
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
    createRequest: typeof lookupMileageExceptionPostRequest;
    createDispose: typeof lookupMileageExceptionPostDispose;

    updateRequest: typeof lookupMileageExceptionPutRequest;
    updateDispose: typeof lookupMileageExceptionPutDispose;

    // query
    loadAllRequest: typeof lookupMileageExceptionGetAllRequest;
    loadAllDispose: typeof lookupMileageExceptionGetAllDispose;

    loadListRequest: typeof lookupMileageExceptionGetListRequest;
    loadListDispose: typeof lookupMileageExceptionGetListDispose;

    loadDetailRequest: typeof lookupMileageExceptionGetByIdRequest;
    loadDetailDispose: typeof lookupMileageExceptionGetByIdDispose;
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
    createRequest: (request: IMileageExceptionPostRequest) => dispatch(lookupMileageExceptionPostRequest(request)),
    createDispose: () => dispatch(lookupMileageExceptionPostDispose()),

    updateRequest: (request: IMileageExceptionPutRequest) => dispatch(lookupMileageExceptionPutRequest(request)), 
    updateDispose: () => dispatch(lookupMileageExceptionPutDispose()),

    // query
    loadAllRequest: (request: IMileageExceptionAllRequest) => dispatch(lookupMileageExceptionGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupMileageExceptionGetAllDispose()),

    loadListRequest: (request: IMileageExceptionListRequest) => dispatch(lookupMileageExceptionGetListRequest(request)),
    loadListDispose: () => dispatch(lookupMileageExceptionGetListDispose()),

    loadDetailRequest: (request: IMileageExceptionByIdRequest) => dispatch(lookupMileageExceptionGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupMileageExceptionGetByIdDispose())
  }
});

export const withLookupMileageException = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);