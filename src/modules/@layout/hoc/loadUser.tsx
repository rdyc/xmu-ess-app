import { AppStorage } from '@constants/index';
import { IAppState } from '@generic/interfaces';
import { IAppUser, IUserState } from '@layout/interfaces';
import { userAssign } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';
import { Dispatch } from 'redux';
import * as store from 'store';

interface PropsFromState {
  userState: IUserState;
}

interface PropsFromDispatch {
  assignUser: typeof userAssign;
}

type AllProps
  = PropsFromState
  & PropsFromDispatch;

const loadUser = (WrappedComponent: React.ComponentType) => { 
  const displayName = `LoadUser(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const loadUserComponent: React.SFC<AllProps> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ user }: IAppState) => ({
    userState: user
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    assignUser: (user: IAppUser) => dispatch(userAssign(user))
  });

  const lifeCycleFunctions: ReactLifeCycleFunctions<AllProps, {}> = {
    componentWillMount() {
      if (!this.props.userState.user) {
        const user: IAppUser = store.get(AppStorage.User);

        if (user) {
          this.props.assignUser(user);
        }
      }
    }
  };

  return compose<AllProps, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle<AllProps, {}>(lifeCycleFunctions)
  )(loadUserComponent);
};

export default loadUser;