import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILookupLeaveDeleteRequest,
  ILookupLeaveGetAllRequest,
  ILookupLeaveGetDetailRequest,
  ILookupLeaveGetListRequest,
  ILookupLeavePostRequest,
  ILookupLeavePutRequest,
} from '@lookup/classes/queries';
import { ILookupLeave, ILookupLeaveDetail, ILookupLeaveList } from '@lookup/classes/response';
import { ILeavePage, LookupLeaveTabs } from '@lookup/classes/types';
import {
  lookupLeaveChangePage,
  lookupLeaveDeleteDispose,
  lookupLeaveDeleteRequest,
  lookupLeaveGetAllDispose,
  lookupLeaveGetAllRequest,
  lookupLeaveGetByIdDispose,
  lookupLeaveGetByIdRequest,
  lookupLeaveGetListDispose,
  lookupLeaveGetListRequest,
  lookupLeavePostDispose,
  lookupLeavePostRequest,
  lookupLeavePutDispose,
  lookupLeavePutRequest,
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupLeaveState: {
    all: IQueryCollectionState<ILookupLeaveGetAllRequest, ILookupLeave>;
    list: IQueryCollectionState<ILookupLeaveGetListRequest, ILookupLeaveList>;
    detail: IQuerySingleState<ILookupLeaveGetDetailRequest, ILookupLeaveDetail>;
    page: ILeavePage;
  };
}

interface PropsFromDispatch {
  lookupLeaveDispatch: {
    // command
    createRequest: typeof lookupLeavePostRequest;
    createDispose: typeof lookupLeavePostDispose;
    updateRequest: typeof lookupLeavePutRequest;
    updateDispose: typeof lookupLeavePutDispose;
    deleteRequest: typeof lookupLeaveDeleteRequest;
    deleteDispose: typeof lookupLeaveDeleteDispose;

    // query
    loadAllRequest: typeof lookupLeaveGetAllRequest;
    loadAllDispose: typeof lookupLeaveGetAllDispose;
    loadListRequest: typeof lookupLeaveGetListRequest;
    loadListDispose: typeof lookupLeaveGetListDispose;
    loadDetailRequest: typeof lookupLeaveGetByIdRequest;
    loadDetailDispose: typeof lookupLeaveGetByIdDispose;

    // page
    changePage: typeof lookupLeaveChangePage;
  };
}

export interface WithLookupLeave extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupLeaveGetAll, lookupLeaveGetList, lookupLeaveGetById, lookupLeavePage }: IAppState) => ({
  lookupLeaveState: {
    all: lookupLeaveGetAll,
    list: lookupLeaveGetList,
    detail: lookupLeaveGetById,
    page: lookupLeavePage
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupLeaveDispatch: {
    // command
    createRequest: (request: ILookupLeavePostRequest) => dispatch(lookupLeavePostRequest(request)),
    createDispose: () => dispatch(lookupLeavePostDispose()),
    updateRequest: (request: ILookupLeavePutRequest) => dispatch(lookupLeavePutRequest(request)),
    updateDispose: () => dispatch(lookupLeavePutDispose()),
    deleteRequest: (request: ILookupLeaveDeleteRequest) => dispatch(lookupLeaveDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupLeaveDeleteDispose()),
    
    // query
    loadAllRequest: (request: ILookupLeaveGetAllRequest) => dispatch(lookupLeaveGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupLeaveGetAllDispose()),
    loadListRequest: (request: ILookupLeaveGetListRequest) => dispatch(lookupLeaveGetListRequest(request)),
    loadListDispose: () => dispatch(lookupLeaveGetListDispose()),
    loadDetailRequest: (request: ILookupLeaveGetDetailRequest) => dispatch(lookupLeaveGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupLeaveGetByIdDispose()),

    // page
    changePage: (leavePage: LookupLeaveTabs) => dispatch(lookupLeaveChangePage(leavePage))
  }
});

export const withLookupLeave = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);