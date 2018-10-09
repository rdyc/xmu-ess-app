import { IAppState } from '@generic/interfaces';
import { IUserState } from '@layout/interfaces';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

export interface WithUser {
  userState: IUserState;
}

const withUser = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithUser(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const userComponent: React.SFC<WithUser> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ user }: IAppState) => ({
    userState: user
  });

  return compose<WithUser, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(userComponent);
};

export default withUser;