import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { LookupLeaveTabs } from '@lookup/classes/types';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { LeaveTabView } from './LeaveTabView';

interface IOwnRouteParams {

}

interface IOwnState {
}

interface IOwnHandlers {
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnOption {
  
}

export type LeaveTabProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandlers
  & WithTheme 
  & WithMasterPage
  & WithLookupLeave
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & RouteComponentProps<IOwnRouteParams>;

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<LeaveTabProps, IOwnHandlers> = {
  // 
};

const lifecycles: ReactLifeCycleFunctions<LeaveTabProps, IOwnState> = {
  componentDidMount() {
    const { page } = this.props.lookupLeaveState;
    const employeePath: string = `/lookup/leaves/${LookupLeaveTabs.EmployeeLeave}`;
    const pathname: string = this.props.location.pathname;

    if (page.leavePage) {
      this.props.history.push(`/lookup/leaves/${page.leavePage}`);
    } else {
      if (employeePath !== pathname) {
        this.props.history.push(`/lookup/leaves/${LookupLeaveTabs.Leave}`);
      }
    }
  },
  componentDidUpdate(prevProps: LeaveTabProps) {
    // 
  },
  componentWillUnmount() {
    // 
  }
};

export const LeaveTab = compose<LeaveTabProps, IOwnOption>(
  setDisplayName('LeaveTab'),
  injectIntl,
  withMasterPage,
  withRouter,
  withLookupLeave,
  withStyles(styles, { withTheme: true }),
  withStateHandlers({}, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveTabView);