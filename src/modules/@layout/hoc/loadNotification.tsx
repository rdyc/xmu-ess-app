import { withUser, WithUser } from '@layout/hoc/withUser';
import { INotificationQuery } from '@layout/interfaces';
import { notificationFetchRequest } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';
import { Dispatch } from 'redux';

interface PropsFromDispatch {
  fetchRequest: typeof notificationFetchRequest;
}

type AllProps 
  = PropsFromDispatch 
  & WithUser;

const loadNotification = (WrappedComponent: React.ComponentType) => {
  const displayName = `LoadNotification(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const loadNotificationComponent: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRequest: (params: INotificationQuery) => dispatch(notificationFetchRequest(params)),
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentDidMount() { 
      const { fetchRequest } = this.props;
      const { user } = this.props.userState;

      if (user) {
        fetchRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    },
};
  
  return compose<AllProps, {}>(
    setDisplayName(displayName),
    withUser,
    connect(undefined, mapDispatchToProps),
    lifecycle<AllProps, {}>(lifeCycleFunctions),
  )(loadNotificationComponent);
};

export default loadNotification;