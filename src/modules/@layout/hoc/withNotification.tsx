import { IAppState } from '@generic/interfaces';
import { INotificationMark, INotificationQuery, INotificationState } from '@layout/interfaces';
import { notificationComplete, notificationGetAllDispose, notificationGetAllRequest } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  notificationState: INotificationState;
}
interface PropsFromDispatch {
  notificationDispatch: {
    loadAllRequest: typeof notificationGetAllRequest;
    loadAllDispose: typeof notificationGetAllDispose;
    markAsComplete: typeof notificationComplete;
  };
}

export interface WithNotification extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ notification }: IAppState) => ({
  notificationState: notification
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  notificationDispatch: {
    loadAllRequest: (params: INotificationQuery) => dispatch(notificationGetAllRequest(params)),
    loadAllDispose: () => dispatch(notificationGetAllDispose()),
    markAsComplete: (params: INotificationMark) => dispatch(notificationComplete(params))
  }
});

export const withNotification = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);