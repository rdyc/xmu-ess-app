import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { MonitoringTabs } from '@webjob/classes/types/monitoring/MonitoringTabs';
import { WithWebJobMonitoring, withWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
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
  // employeeUid: string;
}

interface IOwnState {
  tabValue?: number;
}

interface IOwnHandlers {
  handleChangeTab: (tabValue: number) => void;
  handleLoadStatistic: () => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnOption {
  tab: MonitoringTabs;
}

export type WebJobMonitoringTabProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandlers
  & WithTheme 
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
  handleChangeTab: (props: WebJobMonitoringTabProps) => (tabValue: number) => {
    props.stateUpdate({
      tabValue
    });
  },
  handleLoadStatistic: (props: WebJobMonitoringTabProps) => () => {
    const { loadAllStatisticRequest } = props.webJobMonitoringDispatch;

    const { isLoading } = props.webJobMonitoringState.statisticAll;

    if (!isLoading) {
      loadAllStatisticRequest({});
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<WebJobMonitoringTabProps, IOwnState> = {
  componentDidMount() {
    const tabs = Object.keys(MonitoringTabs).map(key => ({
      id: key,
      name: MonitoringTabs[key]
    }));

    tabs.map((item, index) => item.name === this.props.tab ? this.props.handleChangeTab(index) : null);

    const { response } = this.props.webJobMonitoringState.statisticAll;

    if (!response) {
      this.props.handleLoadStatistic();
    }

    setInterval(this.props.handleLoadStatistic, 60 * 1000);
  },
  componentWillUpdate(nextProps: WebJobMonitoringTabProps) {
    // 
  }
};

export const WebJobMonitoringTab = compose<WebJobMonitoringTabProps, IOwnOption>(
  setDisplayName('WebJobMonitoringTab'),
  withRouter,
  withWebJobMonitoring,
  withStyles(styles, { withTheme: true }),
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>({}, stateUpdaters),
  withHandlers<WebJobMonitoringTabProps, IOwnHandlers>(handlerCreators),
  lifecycle<WebJobMonitoringTabProps, IOwnState>(lifecycles)
)(WebJobMonitoringTabView);