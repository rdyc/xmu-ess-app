import { IBasePagingFilter } from '@generic/interfaces';
import { INotifSettingGetAllFilter } from '@hr.notification/classes/filters/setting';
import { INotifSetting } from '@hr.notification/classes/response';
import { NotifSettingField } from '@hr.notification/classes/types';
import { WithNotifSetting, withNotifSetting } from '@hr.notification/hoc/withNotifSetting';
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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { INotifSettingListFilterResult } from './NotifSettingListFilter';
import { NotifSettingListView } from './NotifSettingListView';

interface IOwnOption {
  
}

interface IOwnState extends INotifSettingListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: INotifSetting, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: INotifSettingListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type NotifSettingListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithNotifSetting
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isFilterOpen: false,
  fields: Object.keys(NotifSettingField).map(key => ({ 
    value: key, 
    name: NotifSettingField[key] 
  }))
});

const stateUpdaters: StateUpdaters<NotifSettingListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: INotifSettingListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false,
  })
};

const handlerCreators: HandleCreators<NotifSettingListProps, IOwnHandler> = {
  handleOnLoadApi: (props: NotifSettingListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.notifSettingState.all;
    const { loadAllRequest } = props.notifSettingDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: INotifSettingGetAllFilter = {
        companyUid: props.companyUid,
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
  handleOnLoadApiSearch: (props: NotifSettingListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.notifSettingState.all;
    const { loadAllRequest } = props.notifSettingDispatch;

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
  handleOnBind: (props: NotifSettingListProps) => (item: INotifSetting, index: number) => ({
    key: index,
    primary: item.company && item.company.name || item.companyUid,
    secondary: item.subject,
    tertiary: item.class,
    quaternary: item.to.join(', '),
    quinary: item.cc.join(', '),
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: NotifSettingListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: NotifSettingListProps) => (filter: INotifSettingListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: NotifSettingListProps) => () => {
    return props.companyUid !== undefined;
  },
};

const lifeCycles: ReactLifeCycleFunctions<NotifSettingListProps, IOwnState> = {
  componentDidUpdate(prevProps: NotifSettingListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid
      },
      {
        companyUid: prevProps.companyUid
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const NotifSettingList = compose<NotifSettingListProps, IOwnOption>(
  setDisplayName('NotifSettingList'),
  withUser,
  withNotifSetting,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles)
)(NotifSettingListView);