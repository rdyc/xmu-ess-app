import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { IWebJobMonitoringServer } from '@webjob/classes/response';
import { IWebJobRequestField } from '@webjob/classes/types';
import { withWebJobMonitoring, WithWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
// import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { WebJobServerListView } from './WebJobServerListView';

interface IOwnOption {
  
}

interface IOwnParams {
  
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {

}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBind: (item: IWebJobMonitoringServer, index: number) => IDataBindResult;
}

export type WebJobServerListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps<IOwnParams>
  & WithStyles<typeof styles>
  & WithUser
  & WithWidth 
  & WithWebJobMonitoring;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IWebJobRequestField).map(key => ({
      value: key,
      name: IWebJobRequestField[key]
    })),
  };

  return state;
};

const stateUpdaters: StateUpdaters<WebJobServerListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<WebJobServerListProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobServerListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllServerRequest } = props.webJobMonitoringDispatch;
    const { isLoading } = props.webJobMonitoringState.serverAll;

    if (props.userState.user && !isLoading) {
      // only load when request parameter are differents
      loadAllServerRequest({});
      // if (isExpired || isRetry) {
      // }
    }
  },
  handleOnBind: (props: WebJobServerListProps) => (item: IWebJobMonitoringServer, index: number) => ({
    key: index,
    primary: item.name,
    secondary: item.queues[0],
    tertiary: item.workersCount.toString(),
    quaternary: item.startedAt,
    quinary: '',
    senary: item.heartbeat
  }),
};

const lifecycles: ReactLifeCycleFunctions<WebJobServerListProps, IOwnState> = {
  componentDidMount() {
    const { response, isLoading } = this.props.webJobMonitoringState.serverAll;

    if (!response && !isLoading) {
      this.props.handleOnLoadApi();
    }
  },
}; 

export const WebJobServerList = compose<WebJobServerListProps, IOwnOption>(
  setDisplayName('WebJobServerList'),
  withUser,
  withRouter,
  withWebJobMonitoring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withWidth(),
  withStyles(styles),
  lifecycle(lifecycles),
)(WebJobServerListView);