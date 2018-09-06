import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { push } from 'react-router-redux';
import userManager from '../../utils/userManager';

class CallbackPage extends React.Component<RouteComponentProps<{}> & { dispatch: any }, {}> {

  public successCallback = (user: User) => {
    // get the user's previous location, passed during signinRedirect()
    const state = user.state;
    const redirectPath = (state !== undefined ? state.path : '/');
    this.props.dispatch(push(redirectPath, { from: this.props.location }));
  }

  public errorCallback = (error: Error) => {
    console.log(error);
    this.props.dispatch(push('/'));
  }

  public render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={this.successCallback}
        errorCallback={this.errorCallback}
      >
        <div>Loading...</div>
      </CallbackComponent>
    );
  }
}

export default connect()(CallbackPage);