import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { WithWebJobMonitoring, withWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

import { WebJobMonitoringListView } from './WebJobMonitoringListView';

interface IOwnRouteParams {
  type: string;
}

interface IOwnState {
  // jobsType: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  // handleJobsItem: (type: string) => IOwnState;
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
  & WithWebJobMonitoring
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<WebJobMonitoringListProps, IOwnState> = (): IOwnState => ({
  // jobsType: ''
});

const stateUpdaters: StateUpdaters<WebJobMonitoringListProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  // handleJobsItem: (props: WebJobMonitoringListProps) => (type: string) => ({
  //   jobsType: type
  // })
};

const handlerCreators: HandleCreators<WebJobMonitoringListProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobMonitoringListProps) => () => { 
    // const { loadDetailRequest } = props.employeeFinalDispatch;
    // const { isLoading } = props.employeeFinalState.detail;
    // const { user } = props.userState;

    // const { loadNextRequest, loadCurrentRequest } = props.hrCompetencyMappedDispatch;
    // const { isLoading: nextLoading } = props.hrCompetencyMappedState.next;
    // const { isLoading: currentLoading } = props.hrCompetencyMappedState.current;

    // if (user && !isLoading && !nextLoading && !currentLoading) {
    //   loadDetailRequest({
    //     employeeUid: user.uid,
    //     positionUid: user.position.uid
    //   });

    //   loadNextRequest({
    //     positionUid: user.position.uid,
    //     employeeLevel: user.level.uid
    //   });

    //   loadCurrentRequest({
    //     positionUid: user.position.uid,
    //     employeeLevel: user.level.uid,
    //     filter: {
    //       isCurrent: true
    //     }
    //   });
    // }
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
  withWebJobMonitoring,
  injectIntl,
  withStyles(styles),
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<WebJobMonitoringListProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('WebJobMonitoringList')
)(WebJobMonitoringListView);