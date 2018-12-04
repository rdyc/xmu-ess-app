import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveApprovalGetAllRequest,
  ILeaveApprovalGetByIdRequest,
  ILeaveApprovalPostRequest,
} from '@leave/classes/queries/approval/';
import { ILeave, ILeaveDetail } from '@leave/classes/response';
import {
  leaveApprovalGetAllDispose,
  leaveApprovalGetAllRequest,
  leaveApprovalGetByIdDispose,
  leaveApprovalGetByIdRequest,
  leaveApprovalPostDispose,
  leaveApprovalPostRequest,
} from '@leave/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  leaveApprovalState: {
    all: IQueryCollectionState<ILeaveApprovalGetAllRequest, ILeave>;
    detail: IQuerySingleState<ILeaveApprovalGetByIdRequest, ILeaveDetail>;
  };
}

interface PropsFromDispatch {
  leaveApprovalDispatch: {
    // command
    createRequest: typeof leaveApprovalPostRequest;
    createDispose: typeof leaveApprovalPostDispose;

    // query
    loadAllRequest: typeof leaveApprovalGetAllRequest;
    loadAllDispose: typeof leaveApprovalGetAllDispose;
    loadDetailRequest: typeof leaveApprovalGetByIdRequest;
    loadDetailDispose: typeof leaveApprovalGetByIdDispose;
  };
}

export interface WithLeaveApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ leaveApprovalGetAll, leaveApprovalGetById }: IAppState) => ({
  leaveApprovalState: {
    all: leaveApprovalGetAll,
    detail: leaveApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveApprovalDispatch: {
    // command
    createRequest: (request: ILeaveApprovalPostRequest) => dispatch(leaveApprovalPostRequest(request)),
    createDispose: () => dispatch(leaveApprovalPostDispose()),
    
    // query
    loadAllRequest: (request: ILeaveApprovalGetAllRequest) => dispatch(leaveApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(leaveApprovalGetAllDispose()),
    loadDetailRequest: (request: ILeaveApprovalGetByIdRequest) => dispatch(leaveApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(leaveApprovalGetByIdDispose()),
  }
});

export const withLeaveApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);