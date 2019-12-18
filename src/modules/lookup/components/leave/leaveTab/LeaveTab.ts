// import AppMenu from '@constants/AppMenu';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { LookupLeaveTabs } from '@lookup/classes/types';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
// import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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

    this.props.history.push(`/lookup/leaves/${page.leavePage || LookupLeaveTabs.Leave}`);

    // this.props.masterPage.changePage({
    //   uid: AppMenu.LookupLeave,
    //   parentUid: AppMenu.Lookup,
    //   title: this.props.intl.formatMessage(lookupMessage.leave.page.listTitle),
    // });
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