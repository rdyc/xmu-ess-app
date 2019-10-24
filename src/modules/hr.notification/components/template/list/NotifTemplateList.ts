import { IBasePagingFilter } from '@generic/interfaces';
import { INotifTemplateGetAllFilter } from '@hr.notification/classes/filters/template';
import { INotifTemplate } from '@hr.notification/classes/response';
import { NotifTemplateField } from '@hr.notification/classes/types';
import { WithNotifTemplate, withNotifTemplate } from '@hr.notification/hoc/withNotifTemplate';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { NotifTemplateListView } from './NotifTemplateListView';

interface IOwnOption {
  
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: INotifTemplate, index: number) => IDataBindResult;
}

export type NotifTemplateListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithNotifTemplate
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => ({
  fields: Object.keys(NotifTemplateField).map(key => ({ 
    value: key, 
    name: NotifTemplateField[key] 
  }))
});

const stateUpdaters: StateUpdaters<NotifTemplateListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<NotifTemplateListProps, IOwnHandler> = {
  handleOnLoadApi: (props: NotifTemplateListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.notifTemplateState.all;
    const { loadAllRequest } = props.notifTemplateDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: INotifTemplateGetAllFilter = {
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
  handleOnLoadApiSearch: (props: NotifTemplateListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.notifTemplateState.all;
    const { loadAllRequest } = props.notifTemplateDispatch;

    if (props.userState.user && !isLoading) {
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
  handleOnBind: () => (item: INotifTemplate, index: number) => ({
    key: index,
    primary: item.name,
    secondary: '',
    tertiary: '',
    quaternary: '',
    quinary: '',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

const lifeCycles: ReactLifeCycleFunctions<NotifTemplateListProps, IOwnState> = {
  componentDidUpdate() {
    //
  }
};

export const NotifTemplateList = compose<NotifTemplateListProps, IOwnOption>(
  setDisplayName('NotifTemplateList'),
  withUser,
  withNotifTemplate,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles)
)(NotifTemplateListView);