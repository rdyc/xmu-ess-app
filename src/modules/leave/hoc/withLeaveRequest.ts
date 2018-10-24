import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveRequestGetAllRequest,
  ILeaveRequestGetByIdRequest,
  ILeaveRequestPostRequest,
  ILeaveRequestPutRequest,
} from '@leave/classes/queries/request/';
import { ILeaveRequest, ILeaveRequestDetail } from '@leave/classes/response';
import {
  leaveRequestGetAllDispose,
  leaveRequestGetAllRequest,
  leaveRequestGetByIdDispose,
  leaveRequestGetByIdRequest,
  leaveRequestPostDispose,
  leaveRequestPostRequest,
  leaveRequestPutDispose,
  leaveRequestPutRequest,
} from '@leave/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  leaveRequestState: {
    all: IQueryCollectionState<ILeaveRequestGetAllRequest, ILeaveRequest>;
    detail: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
  };
}

interface PropsFromDispatch {
  leaveRequestDispatch: {
    // command
    createRequest: typeof leaveRequestPostRequest;
    createDispose: typeof leaveRequestPostDispose;
    updateRequest: typeof leaveRequestPutRequest;
    updateDispose: typeof leaveRequestPutDispose;

    // query
    loadAllRequest: typeof leaveRequestGetAllRequest;
    loadAllDispose: typeof leaveRequestGetAllDispose;
    loadDetailRequest: typeof leaveRequestGetByIdRequest;
    loadDetailDispose: typeof leaveRequestGetByIdDispose;
  };
}

export interface WithLeaveRequest extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ leaveRequestGetAll, leaveRequestGetById }: IAppState) => ({
  leaveRequestState: {
    all: leaveRequestGetAll,
    detail: leaveRequestGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveRequestDispatch: {
    // command
    createRequest: (request: ILeaveRequestPostRequest) => dispatch(leaveRequestPostRequest(request)),
    createDispose: () => dispatch(leaveRequestPostDispose()),
    updateRequest: (request: ILeaveRequestPutRequest) => dispatch(leaveRequestPutRequest(request)),
    updateDispose: () => dispatch(leaveRequestPutDispose()),
    
    // query
    loadAllRequest: (request: ILeaveRequestGetAllRequest) => dispatch(leaveRequestGetAllRequest(request)),
    loadAllDispose: () => dispatch(leaveRequestGetAllDispose()),
    loadDetailRequest: (request: ILeaveRequestGetByIdRequest) => dispatch(leaveRequestGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(leaveRequestGetByIdDispose()),
  }
});

export const withLeaveRequest = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);