import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  ISystemLimitAllRequest,
  ISystemLimitByIdRequest,
  ISystemLimitDeleteRequest,
  ISystemLimitListRequest,
  ISystemLimitPostRequest,
  ISystemLimitPutRequest
} from '@lookup/classes/queries';
import {
  ISystemLimit,
  ISystemLimitDetail,
  ISystemLimitList
} from '@lookup/classes/response';
import {
  systemLimitDeleteDispose,
  systemLimitDeleteRequest,
  systemLimitGetAllDispose,
  systemLimitGetAllRequest,
  systemLimitGetByIdDispose,
  systemLimitGetByIdRequest,
  systemLimitGetListDispose,
  systemLimitGetListRequest,
  systemLimitPostDispose,
  systemLimitPostRequest,
  systemLimitPutDispose,
  systemLimitPutRequest
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  systemLimitState: {
    all: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
    list: IQueryCollectionState<ISystemLimitListRequest, ISystemLimitList>;
    detail: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
  };
}

interface PropsFromDispatch {
  systemLimitDispatch: {
    // command
    createRequest: typeof systemLimitPostRequest;
    createDispose: typeof systemLimitPostDispose;

    updateRequest: typeof systemLimitPutRequest;
    updateDispose: typeof systemLimitPutDispose;

    deleteRequest: typeof systemLimitDeleteRequest;
    deleteDispose: typeof systemLimitDeleteDispose;
    // query
    loadAllRequest: typeof systemLimitGetAllRequest;
    loadAllDispose: typeof systemLimitGetAllDispose;

    loadListRequest: typeof systemLimitGetListRequest;
    loadListDispose: typeof systemLimitGetListDispose;

    loadDetailRequest: typeof systemLimitGetByIdRequest;
    loadDetailDispose: typeof systemLimitGetByIdDispose;
  };
}

export interface WithLookupSystemLimit extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({systemLimitGetAll, systemLimitGetById, systemLimitGetList }: IAppState) => ({
  systemLimitState: {
    all: systemLimitGetAll,
    list: systemLimitGetList,
    detail: systemLimitGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  systemLimitDispatch: {
    // command
    createRequest: (request: ISystemLimitPostRequest) => dispatch(systemLimitPostRequest(request)),
    createDispose: () => dispatch(systemLimitPostDispose()),

    updateRequest: (request: ISystemLimitPutRequest) => dispatch(systemLimitPutRequest(request)),
    updateDispose: () => dispatch(systemLimitPutDispose()),

    deleteRequest: (request: ISystemLimitDeleteRequest) => dispatch(systemLimitDeleteRequest(request)),
    deleteDispose: () => dispatch(systemLimitDeleteDispose()),

    // query
    loadAllRequest: (request: ISystemLimitAllRequest) => dispatch(systemLimitGetAllRequest(request)),
    loadAllDispose: () => dispatch(systemLimitGetAllDispose()),

    loadListRequest: (request: ISystemLimitListRequest) => dispatch(systemLimitGetListRequest(request)),
    loadListDispose: () => dispatch(systemLimitGetListDispose()),

    loadDetailRequest: (request: ISystemLimitByIdRequest) => dispatch(systemLimitGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(systemLimitGetByIdDispose())
  }
});

export const withLookupSystemLimit = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);