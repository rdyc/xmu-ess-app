import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  ILookupMileageExceptionAllRequest,
  ILookupMileageExceptionByIdRequest,
  ILookupMileageExceptionListRequest
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
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupMileageExceptionState: {
    all: IQueryCollectionState<ILookupMileageExceptionAllRequest, IMileageException>;
    list: IQueryCollectionState<ILookupMileageExceptionListRequest, IMileageExceptionList>;
    detail: IQuerySingleState<ILookupMileageExceptionByIdRequest, IMileageExceptionDetail>;
  };
}

interface PropsFromDispatch {
  lookupMileageExceptionDispatch: {

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

const mapStateToProps = ({ lookupMileageExceptionGetAll, lookupMileageExceptionGetById, lookupMileageExceptionGetList }: IAppState) => ({
  lookupMileageExceptionState: {
    all: lookupMileageExceptionGetAll,
    list: lookupMileageExceptionGetList,
    detail: lookupMileageExceptionGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupMileageExceptionDispatch: {
    // query
    loadAllRequest: (request: ILookupMileageExceptionAllRequest) => dispatch(lookupMileageExceptionGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupMileageExceptionGetAllDispose()),

    loadListRequest: (request: ILookupMileageExceptionListRequest) => dispatch(lookupMileageExceptionGetListRequest(request)),
    loadListDispose: () => dispatch(lookupMileageExceptionGetListDispose()),

    loadDetailRequest: (request: ILookupMileageExceptionByIdRequest) => dispatch(lookupMileageExceptionGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupMileageExceptionGetByIdDispose()),
  }
});

export const withLookupMileageException = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);