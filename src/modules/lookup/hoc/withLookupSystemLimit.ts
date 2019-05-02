import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  ISystemLimitAllRequest,
  ISystemLimitAmountRequest,
  ISystemLimitByIdRequest,
  ISystemLimitDeleteRequest,
  ISystemLimitListRequest,
  ISystemLimitPostRequest,
  ISystemLimitPutRequest
} from '@lookup/classes/queries';
import {
  ISystemLimit,
  ISystemLimitAmount,
  ISystemLimitDetail,
  ISystemLimitList
} from '@lookup/classes/response';
import {
  lookupSystemLimitDeleteDispose,
  lookupSystemLimitDeleteRequest,
  lookupSystemLimitGetAllDispose,
  lookupSystemLimitGetAllRequest,
  lookupSystemLimitGetAmountDispose,
  lookupSystemLimitGetAmountRequest,
  lookupSystemLimitGetByIdDispose,
  lookupSystemLimitGetByIdRequest,
  lookupSystemLimitGetListDispose,
  lookupSystemLimitGetListRequest,
  lookupSystemLimitPostDispose,
  lookupSystemLimitPostRequest,
  lookupSystemLimitPutDispose,
  lookupSystemLimitPutRequest
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  systemLimitState: {
    all: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
    amount: IQuerySingleState<ISystemLimitAmountRequest, ISystemLimitAmount>;
    list: IQueryCollectionState<ISystemLimitListRequest, ISystemLimitList>;
    detail: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
  };
}

interface PropsFromDispatch {
  systemLimitDispatch: {
    // command
    createRequest: typeof lookupSystemLimitPostRequest;
    createDispose: typeof lookupSystemLimitPostDispose;

    updateRequest: typeof lookupSystemLimitPutRequest;
    updateDispose: typeof lookupSystemLimitPutDispose;

    deleteRequest: typeof lookupSystemLimitDeleteRequest;
    deleteDispose: typeof lookupSystemLimitDeleteDispose;
    // query
    loadAllRequest: typeof lookupSystemLimitGetAllRequest;
    loadAllDispose: typeof lookupSystemLimitGetAllDispose;

    loadAmountRequest: typeof lookupSystemLimitGetAmountRequest;
    loadAmountDispose: typeof lookupSystemLimitGetAmountDispose;

    loadListRequest: typeof lookupSystemLimitGetListRequest;
    loadListDispose: typeof lookupSystemLimitGetListDispose;

    loadDetailRequest: typeof lookupSystemLimitGetByIdRequest;
    loadDetailDispose: typeof lookupSystemLimitGetByIdDispose;
  };
}

export interface WithLookupSystemLimit extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({systemLimitGetAll, systemLimitGetAmount, systemLimitGetById, systemLimitGetList }: IAppState) => ({
  systemLimitState: {
    all: systemLimitGetAll,
    amount: systemLimitGetAmount,
    list: systemLimitGetList,
    detail: systemLimitGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  systemLimitDispatch: {
    // command
    createRequest: (request: ISystemLimitPostRequest) => dispatch(lookupSystemLimitPostRequest(request)),
    createDispose: () => dispatch(lookupSystemLimitPostDispose()),

    updateRequest: (request: ISystemLimitPutRequest) => dispatch(lookupSystemLimitPutRequest(request)),
    updateDispose: () => dispatch(lookupSystemLimitPutDispose()),

    deleteRequest: (request: ISystemLimitDeleteRequest) => dispatch(lookupSystemLimitDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupSystemLimitDeleteDispose()),

    // query
    loadAllRequest: (request: ISystemLimitAllRequest) => dispatch(lookupSystemLimitGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupSystemLimitGetAllDispose()),
    
    loadAmountRequest: (request: ISystemLimitAmountRequest) => dispatch(lookupSystemLimitGetAmountRequest(request)),
    loadAmountDispose: () => dispatch(lookupSystemLimitGetAmountDispose()),

    loadListRequest: (request: ISystemLimitListRequest) => dispatch(lookupSystemLimitGetListRequest(request)),
    loadListDispose: () => dispatch(lookupSystemLimitGetListDispose()),

    loadDetailRequest: (request: ISystemLimitByIdRequest) => dispatch(lookupSystemLimitGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupSystemLimitGetByIdDispose())
  }
});

export const withLookupSystemLimit = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);