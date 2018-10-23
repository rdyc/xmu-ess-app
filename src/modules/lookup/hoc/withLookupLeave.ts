import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveGetAllRequest,
  ILeaveGetDetailRequest,
  ILeaveGetListRequest,
  ILeavePutRequest
} from '@lookup/classes/queries';
import { ILeave, ILeaveDetail, ILeaveList } from '@lookup/classes/response';
import {
  // lookupCustomerDeleteDispose,
  // lookupCustomerDeleteRequest,
  leaveGetAllDispose,
  leaveGetAllRequest,
  leaveGetByIdDispose,
  leaveGetByIdRequest,
  leaveGetListDispose,
  leaveGetListRequest,
  // lookupCustomerPostDispose,
  // lookupCustomerPostRequest,
  leavePutDispose,
  leavePutRequest,
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupLeaveState: {
    all: IQueryCollectionState<ILeaveGetAllRequest, ILeave>;
    list: IQueryCollectionState<ILeaveGetListRequest, ILeaveList>;
    detail: IQuerySingleState<ILeaveGetDetailRequest, ILeaveDetail>;
  };
}

interface PropsFromDispatch {
  lookupLeaveDispatch: {
    // command
    // createRequest: typeof lookupCustomerPostRequest;
    // createDispose: typeof lookupCustomerPostDispose;
    updateRequest: typeof leavePutRequest;
    updateDispose: typeof leavePutDispose;
    // deleteRequest: typeof lookupCustomerDeleteRequest;
    // deleteDispose: typeof lookupCustomerDeleteDispose;

    // query
    loadAllRequest: typeof leaveGetAllRequest;
    loadAllDispose: typeof leaveGetAllDispose;
    loadListRequest: typeof leaveGetListRequest;
    loadListDispose: typeof leaveGetListDispose;
    loadDetailRequest: typeof leaveGetByIdRequest;
    loadDetailDispose: typeof leaveGetByIdDispose;
  };
}

export interface WithLookupLeave extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ leaveGetAll, leaveGetList, leaveGetById }: IAppState) => ({
  lookupLeaveState: {
    all: leaveGetAll,
    list: leaveGetAll,
    detail: leaveGetAll,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupLeaveDispatch: {
    // command
    // createRequest: (request: ILookupCustomerPostRequest) => dispatch(lookupCustomerPostRequest(request)),
    // createDispose: () => dispatch(lookupCustomerPostDispose()),
    updateRequest: (request: ILeavePutRequest) => dispatch(leavePutRequest(request)),
    updateDispose: () => dispatch(leavePutDispose()),
    // deleteRequest: (request: ILookupCustomerDeleteRequest) => dispatch(lookupCustomerDeleteRequest(request)),
    // deleteDispose: () => dispatch(lookupCustomerDeleteDispose()),
    
    // query
    loadAllRequest: (request: ILeaveGetAllRequest) => dispatch(leaveGetAllRequest(request)),
    loadAllDispose: () => dispatch(leaveGetAllDispose()),
    loadListRequest: (request: ILeaveGetListRequest) => dispatch(leaveGetListRequest(request)),
    loadListDispose: () => dispatch(leaveGetListDispose()),
    loadDetailRequest: (request: ILeaveGetDetailRequest) => dispatch(leaveGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(leaveGetByIdDispose()),
  }
});

export const withLookupLeave = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);