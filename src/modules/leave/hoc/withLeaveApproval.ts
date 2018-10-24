import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveApprovalGetAllRequest,
  ILeaveApprovalGetByIdRequest,
  ILeaveApprovalPostRequest,
} from '@leave/classes/queries/approval/';
import { ILeaveRequest, ILeaveRequestDetail } from '@leave/classes/response';
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
    all: IQueryCollectionState<ILeaveApprovalGetAllRequest, ILeaveRequest>;
    detail: IQuerySingleState<ILeaveApprovalGetByIdRequest, ILeaveRequestDetail>;
  };
}

interface PropsFromDispatch {
  leaveApprovalDispatch: {
    // command
    createApproval: typeof leaveApprovalPostRequest;
    createDispose: typeof leaveApprovalPostDispose;

    // query
    loadAllApproval: typeof leaveApprovalGetAllRequest;
    loadAllDispose: typeof leaveApprovalGetAllDispose;
    loadDetailApproval: typeof leaveApprovalGetByIdRequest;
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
    createApproval: (request: ILeaveApprovalPostRequest) => dispatch(leaveApprovalPostRequest(request)),
    createDispose: () => dispatch(leaveApprovalPostDispose()),
    
    // query
    loadAllApproval: (request: ILeaveApprovalGetAllRequest) => dispatch(leaveApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(leaveApprovalGetAllDispose()),
    loadDetailApproval: (request: ILeaveApprovalGetByIdRequest) => dispatch(leaveApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(leaveApprovalGetByIdDispose()),
  }
});

export const withLeaveApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);