import AppStorage from '@constants/AppStorage';
import { IAppState } from '@generic/interfaces';
import { IAppUser, IUserState } from '@layout/interfaces';
import { userAssign } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export interface WithUser {
  userState: IUserState;
}

interface PropsFromDispatch {
  assignUser: typeof userAssign;
}

const mapStateToProps = ({ user }: IAppState) => ({
  userState: user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  assignUser: (user: IAppUser) => dispatch(userAssign(user))
});

export const withUser = (WrappedComponent: React.ComponentType) => { 
  class WithUserContainer extends React.Component<WithUser & PropsFromDispatch, {}> {
    public componentWillMount() {
      if (!this.props.userState.user) {
        const user: IAppUser = store.get(AppStorage.User);
  
        if (user) {
          this.props.assignUser(user);
        }
      }
    }
  
    public render () {
      return (
        <WrappedComponent {...this.props}/>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithUserContainer); 
};