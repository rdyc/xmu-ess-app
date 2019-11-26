import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { MonitoringTabs } from '@webjob/classes/types/monitoring/MonitoringTabs';
import { WithWebJobMonitoring, withWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
import { WithWebJobPage, withWebJobPage } from '@webjob/hoc/withWebJobPage';
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

import { WebJobMonitoringTabView } from './WebJobMonitoringTabView';

interface IOwnRouteParams {

}

interface IOwnState {
  intervalId?: NodeJS.Timeout;
}

interface IOwnHandlers {
  handleLoadStatistic: () => void;
  handleIntervalId: (intervalId: NodeJS.Timeout) => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnOption {
  
}

export type WebJobMonitoringTabProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandlers
  & WithTheme 
  & WithWebJobPage
  & WithStyles<typeof styles>
  & WithWebJobMonitoring
  & InjectedIntlProps
  & RouteComponentProps<IOwnRouteParams>;

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<WebJobMonitoringTabProps, IOwnHandlers> = {
  handleLoadStatistic: (props: WebJobMonitoringTabProps) => () => {
    const { loadAllStatisticRequest } = props.webJobMonitoringDispatch;

    const { isLoading } = props.webJobMonitoringState.statisticAll;

    if (!isLoading) {
      loadAllStatisticRequest({});
    }
  },
  handleIntervalId: (props: WebJobMonitoringTabProps) => (intervalId: NodeJS.Timeout) => {
    props.stateUpdate({
      intervalId
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<WebJobMonitoringTabProps, IOwnState> = {
  componentDidMount() {
    const { page } = this.props.webJobPageState;

    if (page) {
      this.props.history.push(`/webjob/${page.webJobPage || MonitoringTabs.Monitoring}`);
    }

    const { response } = this.props.webJobMonitoringState.statisticAll;

    if (!response) {
      this.props.handleLoadStatistic();
    }

    // Per 60 sec
    const interval = setInterval(this.props.handleLoadStatistic, 60 * 1000);

    this.props.handleIntervalId(interval);
  },
  componentDidUpdate(prevProps: WebJobMonitoringTabProps) {
    // const { page: thisPage } = this.props.webJobPageState;
    // console.log('thisPage', thisPage);
  },
  componentWillUnmount() {
    if (this.props.intervalId) {
      clearInterval(this.props.intervalId);
    }
  }
};

export const WebJobMonitoringTab = compose<WebJobMonitoringTabProps, IOwnOption>(
  setDisplayName('WebJobMonitoringTab'),
  injectIntl,
  withRouter,
  withWebJobPage,
  withWebJobMonitoring,
  withStyles(styles, { withTheme: true }),
  withStateHandlers({}, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(WebJobMonitoringTabView);