import { IAppState } from '@generic/interfaces';
import { ILeaveGetEndQuery } from '@leave/classes/queries/request';
import { ILeaveState } from '@leave/classes/states';
import { leaveRequestFetchRequest } from '@leave/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  leaveEndState: ILeaveState;
}
interface PropsFromDispatch {
  leaveEndDispatch: {
    fetchRequest: typeof leaveRequestFetchRequest;
  };
}

export interface WithLeaveEnd extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ getEnd }: IAppState) => ({
  leaveEndState: getEnd
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveEndDispatch: {
    fetchRequest: (params: ILeaveGetEndQuery) => dispatch(leaveRequestFetchRequest(params)),
  }
});

export const WithLeaveEnd = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);