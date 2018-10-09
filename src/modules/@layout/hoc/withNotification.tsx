import { IAppState } from '@generic/interfaces';
import { INotificationState } from '@layout/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

export interface WithNotification {
  notificationState: INotificationState;
}

const withNotification = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithNotification(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const withNotificationComponent: React.SFC<WithNotification> = props => <WrappedComponent {...props}/>;

  const mapStateToProps = ({ notification }: IAppState) => ({
    notificationState: notification
  });
  
  return compose<WithNotification, {}>( 
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withNotificationComponent);
};

export default withNotification;