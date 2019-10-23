import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobMonitoringQueue } from '@webjob/classes/response';
import { IWebJobRequestField } from '@webjob/classes/types';
import { withWebJobMonitoring, WithWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
// import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { MonitoringQueuesListView } from './MonitoringQueuesListView';

interface IOwnOption {
  
}

interface IOwnParams {
  type: string;
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {

}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBind: (item: IWebJobMonitoringQueue, index: number) => IDataBindResult;
}

export type MonitoringQueuesListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps<IOwnParams>
  & WithStyles<typeof styles>
  & WithUser
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

const stateUpdaters: StateUpdaters<MonitoringQueuesListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<MonitoringQueuesListProps, IOwnHandler> = {
  handleOnLoadApi: (props: MonitoringQueuesListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllQueueRequest } = props.webJobMonitoringDispatch;
    const { isExpired, isLoading, response } = props.webJobMonitoringState.queueAll;

    if (props.userState.user && !isLoading) {
      // only load when request parameter are differents
      if (isExpired || isRetry || !response) {
        loadAllQueueRequest({});
      }
    }
  },
  handleOnBind: (props: MonitoringQueuesListProps) => (item: IWebJobMonitoringQueue, index: number) => ({
    key: index,
    primary: item.name,
    secondary: '',
    tertiary: '',
    quaternary: item.length.toString(),
    quinary: '',
    senary: item.fetched.toString()
  }),
};

export const MonitoringQueuesList = compose<MonitoringQueuesListProps, IOwnOption>(
  setDisplayName('MonitoringQueuesList'),
  withUser,
  withRouter,
  withWebJobMonitoring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(MonitoringQueuesListView);