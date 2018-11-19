import { IAppState, IQuerySingleState } from '@generic/interfaces';
import {
  ILeaveGetEndQuery,
} from '@leave/classes/queries/request/';
import { ILeaveGetEnd } from '@leave/classes/response';
import {
  leaveRequestFetchDispose,
  leaveRequestFetchRequest,
} from '@leave/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  leaveGetEndState: {
    detail: IQuerySingleState<ILeaveGetEndQuery, ILeaveGetEnd>;
  };
}

interface PropsFromDispatch {
  leaveGetEndDispatch: {
    loadDetailRequest: typeof leaveRequestFetchRequest;
    loadDetailDispose: typeof leaveRequestFetchDispose;
  };
}

export interface WithLeaveGetEnd extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ leaveGetEnd}: IAppState) => ({
  leaveGetEndState: {
    detail: leaveGetEnd
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveGetEndDispatch: {
    loadDetailRequest: (request: ILeaveGetEndQuery) => dispatch(leaveRequestFetchRequest(request)),
    loadDetailDispose: () => dispatch(leaveRequestFetchDispose()),
  }
});

export const withLeaveGetEnd = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);