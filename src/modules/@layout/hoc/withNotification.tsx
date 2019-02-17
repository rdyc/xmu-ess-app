import { IAppState } from '@generic/interfaces';
import { INotificationMark, INotificationQuery, INotificationState } from '@layout/interfaces';
import { notificationComplete, notificationFetchRequest } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  notificationState: INotificationState;
}
interface PropsFromDispatch {
  notificationDispatch: {
    fetchRequest: typeof notificationFetchRequest;
    markAsComplete: typeof notificationComplete;
  };
}

export interface WithNotification extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ notification }: IAppState) => ({
  notificationState: notification
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  notificationDispatch: {
    fetchRequest: (params: INotificationQuery) => dispatch(notificationFetchRequest(params)),
    markAsComplete: (params: INotificationMark) => dispatch(notificationComplete(params))
  }
});

export const withNotification = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);