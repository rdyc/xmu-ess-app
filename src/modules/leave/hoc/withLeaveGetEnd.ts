import { IAppState } from '@generic/interfaces';
import { ILeaveGetEndQuery } from '@leave/classes/queries/request';
import { ILeaveGetEndState } from '@leave/classes/states/ILeaveState';
import { leaveRequestFetchRequest } from '@leave/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  leaveGetEndState: ILeaveGetEndState;
}
interface PropsFromDispatch {
  leaveGetEndDispatch: {
    fetchRequest: typeof leaveRequestFetchRequest;
  };
}

export interface WithLeaveGetEnd extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ getEnd }: IAppState) => ({
  leaveGetEndState: getEnd
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveGetEndDispatch: {
    fetchRequest: (params: ILeaveGetEndQuery) => dispatch(leaveRequestFetchRequest(params)),
  }
});

export const WithLeaveGetEnd = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);