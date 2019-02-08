import { AppUserManager } from '@utils/index';
import * as React from 'react';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

const callback: React.SFC = props => (
  <div></div>
);

const lifecycles: ReactLifeCycleFunctions<{}, {}> = ({
  componentDidMount() {
    AppUserManager.signinSilentCallback();
  }
});

export const SilentRenew = compose<{}, {}>(
  lifecycle(lifecycles)
)(callback);