import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest
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
  mileageExceptionGetListRequest
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