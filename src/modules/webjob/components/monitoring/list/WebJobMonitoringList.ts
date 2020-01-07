import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

import { WebJobMonitoringListView } from './WebJobMonitoringListView';

interface IOwnRouteParams {
  type: string;
}

interface IOwnState {
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type WebJobMonitoringListProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithMasterPage
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<WebJobMonitoringListProps, IOwnState> = (): IOwnState => ({

});

const stateUpdaters: StateUpdaters<WebJobMonitoringListProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<WebJobMonitoringListProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobMonitoringListProps) => () => { 
    // 
  },
};

const lifecycles: ReactLifeCycleFunctions<WebJobMonitoringListProps, IOwnState> = {
  componentDidMount() {
    this.props.masterPage.changePage({
      uid: AppMenu.WebJob,
      parentUid: AppMenu.Home,
      title: this.props.intl.formatMessage(webJobMessage.shared.page.listTitle, { state: 'Web Job Monitoring'}),
    });
  },
};
 
export const WebJobMonitoringList = compose<WebJobMonitoringListProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withMasterPage,
  injectIntl,
  withStyles(styles),
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<WebJobMonitoringListProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('WebJobMonitoringList')
)(WebJobMonitoringListView);