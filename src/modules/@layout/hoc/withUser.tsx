import { IAppState } from '@generic/interfaces';
import { IAppUser, IUserState } from '@layout/interfaces';
import { switchAccess, userAssign } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  userState: IUserState;
}

interface PropsFromDispatch {
  assignUser: typeof userAssign;
  switchAccess: typeof switchAccess;
}

export interface WithUser extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ user }: IAppState) => ({
  userState: user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  assignUser: (user: IAppUser) => dispatch(userAssign(user)),
  switchAccess: () => dispatch(switchAccess())
});

export const withUser = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);