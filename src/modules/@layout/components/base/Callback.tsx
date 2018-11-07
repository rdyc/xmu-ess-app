import { AppUserManager } from '@utils/index';
import { User } from 'oidc-client';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { push } from 'react-router-redux';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { CallbackComponent } from 'redux-oidc';

const callback: React.SFC<CallbackProps> = props => (
  <CallbackComponent
    userManager={AppUserManager}
    successCallback={props.onSuccess}
    errorCallback={props.onError}
  >
    <span>Loading...</span>
  </CallbackComponent>
);

interface OwnProps extends RouteComponentProps {
  dispatch: Dispatch<any>;
}

interface OwnHandlers {
  onSuccess: (user: User) => void;
  onError: (error: Error) => void;
}

type CallbackProps
  = OwnHandlers
  & OwnProps;
  
const handlerCreators: HandleCreators<CallbackProps, OwnHandlers> = {
  onSuccess: (props: CallbackProps) => (user: User) => { 
    // get the user's previous location, passed during signinRedirect()
    const state = user.state;
    const redirectPath = (state !== undefined ? state.path : '/account/access');

    props.dispatch(push(redirectPath, { from: props.location }));
  },
  onError: (props: CallbackProps) => (error: Error) => { 
    console.log(error);

    props.dispatch(push('/')); 
  }
};

export const Callback = compose<CallbackProps, OwnProps>(
  connect(),
  withHandlers(handlerCreators)
)(callback);