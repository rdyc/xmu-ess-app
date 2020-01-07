import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobMonitoringJobScheduledGetAllFilter } from '@webjob/classes/filters';
import { IWebJobMonitoringJobScheduled } from '@webjob/classes/response';
import { IWebJobRequestField } from '@webjob/classes/types';
import { withWebJobMonitoring, WithWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  shallowEqual,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { MonitoringScheduledListView } from './MonitoringScheduledListView';

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
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IWebJobMonitoringJobScheduled, index: number) => IDataBindResult;
}

export type MonitoringScheduledListProps
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

const stateUpdaters: StateUpdaters<MonitoringScheduledListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<MonitoringScheduledListProps, IOwnHandler> = {
  handleOnLoadApi: (props: MonitoringScheduledListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllJobScheduledRequest } = props.webJobMonitoringDispatch;
    const { isExpired, isLoading, request } = props.webJobMonitoringState.jobScheduledAll;

    if (props.userState.user && !isLoading) {
      const filter: IWebJobMonitoringJobScheduledGetAllFilter = {
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry) {
        loadAllJobScheduledRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: MonitoringScheduledListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.webJobMonitoringState.jobScheduledAll;
    const { loadAllJobScheduledRequest } = props.webJobMonitoringDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        page: undefined
      };
      
      // compare request
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (shouldLoad) {
        loadAllJobScheduledRequest({
          filter
        });
      }
    }
  },
  handleOnBind: (props: MonitoringScheduledListProps) => (item: IWebJobMonitoringJobScheduled, index: number) => ({
    key: index,
    primary: item.id,
    secondary: item.job,
    tertiary: props.intl.formatDate(item.enqueueAt, GlobalFormat.Date),
    quaternary: '',
    quinary: '',
    senary: moment(item.scheduledAt).fromNow() || '-'
  }),
};

export const MonitoringScheduledList = compose<MonitoringScheduledListProps, IOwnOption>(
  setDisplayName('MonitoringScheduledList'),
  withUser,
  withRouter,
  withWebJobMonitoring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(MonitoringScheduledListView);