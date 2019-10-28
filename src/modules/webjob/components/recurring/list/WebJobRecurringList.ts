import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobRecurringGetAllFilter } from '@webjob/classes/filters';
import { IWebJobRecurring } from '@webjob/classes/response';
import { IWebJobRequestField } from '@webjob/classes/types';
import { withWebJobRecurring, WithWebJobRecurring } from '@webjob/hoc/withWebJobRecurring';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
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

import { WebJobRecurringListView } from './WebJobRecurringListView';

interface IOwnOption {
  
}

interface IOwnParams {
  // type: string;
}

interface IOwnState {
  fields: ICollectionValue[];
  isTriggerOpen: boolean;
  jobUid?: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  handleTriggerVisibility: (value: boolean, jobUid?: string) => IOwnState;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IWebJobRecurring, index: number) => IDataBindResult;
}

export type WebJobRecurringListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps<IOwnParams>
  & WithStyles<typeof styles>
  & WithUser
  & WithWebJobRecurring;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IWebJobRequestField).map(key => ({
      value: key,
      name: IWebJobRequestField[key]
    })),
    isTriggerOpen: false,
    jobUid: ''
  };

  return state;
};

const stateUpdaters: StateUpdaters<WebJobRecurringListProps, IOwnState, IOwnStateUpdater> = {
  handleTriggerVisibility: (state: IOwnState) => (value: boolean, jobUid?: string) => ({
    jobUid,
    isTriggerOpen: value,
  })
};

const handlerCreators: HandleCreators<WebJobRecurringListProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobRecurringListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.webJobRecurringDispatch;
    const { isExpired, isLoading, request } = props.webJobRecurringState.all;

    if (props.userState.user && !isLoading) {
      const filter: IWebJobRecurringGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: WebJobRecurringListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.webJobRecurringState.all;
    const { loadAllRequest } = props.webJobRecurringDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined
      };
      
      // compare request
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (shouldLoad) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnBind: (props: WebJobRecurringListProps) => (item: IWebJobRecurring, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.description,
    quaternary: '',
    quinary: item.cron.expression,
    senary: props.intl.formatMessage(item.isAutoStart ? webJobMessage.recurring.field.isAutoStart : webJobMessage.recurring.field.isManualStart)
  }),
};

export const WebJobRecurringList = compose<WebJobRecurringListProps, IOwnOption>(
  setDisplayName('WebJobRecurringList'),
  withUser,
  withRouter,
  withWebJobRecurring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(WebJobRecurringListView);