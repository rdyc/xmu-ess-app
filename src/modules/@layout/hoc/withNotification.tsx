import { IAppState } from '@generic/interfaces';
import { INotificationState } from '@layout/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';

export interface WithNotification {
  notificationState: INotificationState;
}

const withNotification = (WrappedComponent: React.ComponentType) => { 
  class WithNotificationComponent extends React.Component<WithNotification> {
    public static displayName = `WithNotification(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    public render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = ({ notification }: IAppState) => ({
    notificationState: notification
  });
  
  return connect(
    mapStateToProps, 
    undefined
  )(WithNotificationComponent);
};

export default withNotification;