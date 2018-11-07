import { IAppState } from '@generic/interfaces';
import { IAppUser, IUserState } from '@layout/interfaces';
import { userAssign } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  userState: IUserState;
}

interface PropsFromDispatch {
  assignUser: typeof userAssign;
}

export interface WithUser extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ user }: IAppState) => ({
  userState: user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  assignUser: (user: IAppUser) => dispatch(userAssign(user))
});

export const withUser = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);