import { AppStorage } from '@constants/index';
import { IAppState } from '@generic/interfaces';
import { IAppUser, IUserState } from '@layout/interfaces';
import { userAssign } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as store from 'store';

export interface WithUser {
  userState: IUserState;
}

interface PropsFromDispatch {
  assignUser: typeof userAssign;
}

const withUser = (WrappedComponent: React.ComponentType) => { 
  class WithUserComponent extends React.Component<WithUser & PropsFromDispatch> {
    public static displayName = `WithUser(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    public componentDidMount() {
      if (!this.props.userState.user) {
        this.loadStorage();
      }

      console.log(WrappedComponent.displayName, this.props.userState);
    }

    public render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

    private loadStorage() {
      const user: IAppUser = store.get(AppStorage.User);
  
      if (user) {
        this.props.assignUser(user);
      }
    }
  }

  const mapStateToProps = ({ user }: IAppState) => ({
    userState: user
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    assignUser: (user: IAppUser) => dispatch(userAssign(user))
  });
  
  return connect(
    mapStateToProps, 
    mapDispatchToProps
  )(WithUserComponent);
};

export default withUser;