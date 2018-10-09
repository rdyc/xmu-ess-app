import withUser, { WithUser } from '@layout/hoc/withUser';
import { INotificationQuery } from '@layout/interfaces';
import { notificationFetchRequest } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromDispatch {
  fetchRequest: typeof notificationFetchRequest;
}

const loadNotification = (WrappedComponent: React.ComponentType) => {
  type NotificationProps = PropsFromDispatch & WithUser;

  class LoadNotificationComponent extends React.Component<NotificationProps> {
    public static displayName = `LoadNotification(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    public componentDidMount() {
      const { fetchRequest } = this.props;
      const { user } = this.props.userState;

      if (user) {
        fetchRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }

    public render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRequest: (params: INotificationQuery) => dispatch(notificationFetchRequest(params)),
  });
  
  return connect(
    undefined, 
    mapDispatchToProps
  )(
    withUser(
      LoadNotificationComponent
    )
  );
};

export default loadNotification;