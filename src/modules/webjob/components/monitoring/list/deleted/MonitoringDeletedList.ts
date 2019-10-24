import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobMonitoringJobDeletedGetAllFilter } from '@webjob/classes/filters';
import { IWebJobMonitoringJobDeleted } from '@webjob/classes/response';
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
  shallowEqual,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { MonitoringDeletedListView } from './MonitoringDeletedListView';

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
  handleOnBind: (item: IWebJobMonitoringJobDeleted, index: number) => IDataBindResult;
}

export type MonitoringDeletedListProps
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

const stateUpdaters: StateUpdaters<MonitoringDeletedListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<MonitoringDeletedListProps, IOwnHandler> = {
  handleOnLoadApi: (props: MonitoringDeletedListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllJobDeletedRequest } = props.webJobMonitoringDispatch;
    const { isExpired, isLoading, request } = props.webJobMonitoringState.jobDeletedAll;

    if (props.userState.user && !isLoading) {
      const filter: IWebJobMonitoringJobDeletedGetAllFilter = {
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry) {
        loadAllJobDeletedRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: MonitoringDeletedListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.webJobMonitoringState.jobDeletedAll;
    const { loadAllJobDeletedRequest } = props.webJobMonitoringDispatch;
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
        loadAllJobDeletedRequest({
          filter
        });
      }
    }
  },
  handleOnBind: (props: MonitoringDeletedListProps) => (item: IWebJobMonitoringJobDeleted, index: number) => ({
    key: index,
    primary: item.id,
    secondary: item.job,
    tertiary: '',
    quaternary: props.intl.formatDate(item.deletedAt, GlobalFormat.Date),
    quinary: '',
    senary: ''
  }),
};

export const MonitoringDeletedList = compose<MonitoringDeletedListProps, IOwnOption>(
  setDisplayName('MonitoringDeletedList'),
  withUser,
  withRouter,
  withWebJobMonitoring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(MonitoringDeletedListView);