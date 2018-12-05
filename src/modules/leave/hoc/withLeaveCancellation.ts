import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveCancellationGetAllRequest,
  ILeaveCancellationGetByIdRequest,
  ILeaveCancellationPostRequest,
} from '@leave/classes/queries/cancellation/';
import { ILeave, ILeaveDetail } from '@leave/classes/response';
import {
  leaveCancellationGetAllDispose,
  leaveCancellationGetAllRequest,
  leaveCancellationGetByIdDispose,
  leaveCancellationGetByIdRequest,
  leaveCancellationPostDispose,
  leaveCancellationPostRequest,
} from '@leave/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  leaveCancellationState: {
    all: IQueryCollectionState<ILeaveCancellationGetAllRequest, ILeave>;
    detail: IQuerySingleState<ILeaveCancellationGetByIdRequest, ILeaveDetail>;
  };
}

interface PropsFromDispatch {
  leaveCancellationDispatch: {
    // command
    createRequest: typeof leaveCancellationPostRequest;
    createDispose: typeof leaveCancellationPostDispose;

    // query
    loadAllRequest: typeof leaveCancellationGetAllRequest;
    loadAllDispose: typeof leaveCancellationGetAllDispose;
    loadDetailRequest: typeof leaveCancellationGetByIdRequest;
    loadDetailDispose: typeof leaveCancellationGetByIdDispose;
  };
}

export interface WithLeaveCancellation extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ leaveCancellationGetAll, leaveCancellationGetById }: IAppState) => ({
  leaveCancellationState: {
    all: leaveCancellationGetAll,
    detail: leaveCancellationGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveCancellationDispatch: {
    // command
    createRequest: (request: ILeaveCancellationPostRequest) => dispatch(leaveCancellationPostRequest(request)),
    createDispose: () => dispatch(leaveCancellationPostDispose()),
    
    // query
    loadAllRequest: (request: ILeaveCancellationGetAllRequest) => dispatch(leaveCancellationGetAllRequest(request)),
    loadAllDispose: () => dispatch(leaveCancellationGetAllDispose()),
    loadDetailRequest: (request: ILeaveCancellationGetByIdRequest) => dispatch(leaveCancellationGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(leaveCancellationGetByIdDispose()),
  }
});

export const withLeaveCancellation = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);