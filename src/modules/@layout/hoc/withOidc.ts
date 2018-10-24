import { IAppState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { UserState } from 'redux-oidc';

interface PropsFromState {
  oidcState: UserState;
}

export interface WithOidc extends PropsFromState {}

const mapStateToProps = ({ oidc }: IAppState) => ({
  oidcState: oidc,
});

export const withOidc = (component: React.ComponentType) =>
  connect(mapStateToProps)(component);