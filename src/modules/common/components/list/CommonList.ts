import { ISystemAllFilter } from '@common/classes/filters';
import { ISystem } from '@common/classes/response';
import { CommonField } from '@common/classes/types';
import { categoryTypeTranslator } from '@common/helper';
import { withCommonSystem, WithCommonSystem } from '@common/hoc/withCommonSystem';
import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import * as moment from 'moment';
import * as React from 'react';
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
  withStateHandlers
} from 'recompose';
import { ICommonListFilterResult } from './CommonListFilter';
import { CommonListView } from './CommonListView';

interface IOwnOption {
  
}

interface IOwnState extends ICommonListFilterResult  {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
}

interface OwnRouteParams {
  category: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: ISystem, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ICommonListFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type CommonListProps 
  = WithUser
  & IOwnStateUpdater
  & IOwnOption
  & IOwnHandler
  & IOwnState
  & WithCommonSystem
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const createProps: mapper<CommonListProps, IOwnState> = (props: CommonListProps): IOwnState => {
  const { request } = props.commonSystemState.all;
  
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(CommonField).map(key => ({ 
      value: key, 
      name: CommonField[key] 
    }))
  };
  
  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<CommonListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: ICommonListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<CommonListProps, IOwnHandler> = {
  handleOnLoadApi: (props: CommonListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.commonSystemState.all;
    const { systemAllRequest } = props.commonDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: ISystemAllFilter = {
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
      if (shouldLoad || isRetry) {
        systemAllRequest({
          filter,
          category: categoryTypeTranslator(props.match.params.category),
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: CommonListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.commonSystemState.all;
    const { systemAllRequest } = props.commonDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined,
      };
      
      // compare request
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (shouldLoad) {
        systemAllRequest({
          filter,
          category: categoryTypeTranslator(props.match.params.category),
        });
      }
    }
  },
  handleOnBind: (props: CommonListProps) => (item: ISystem) => ({
    key: item.id,
    primary: item.type,
    secondary: item.name,
    tertiary: item.description && item.description || 'N/A',
    quaternary: item.isActive ? props.intl.formatMessage(layoutMessage.text.active) : props.intl.formatMessage(layoutMessage.text.inactive),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName || '?',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: CommonListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: CommonListProps) => (filter: ICommonListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: CommonListProps) => () => {
    return props.companyUid !== undefined ;
  },
};

const lifecycles: ReactLifeCycleFunctions<CommonListProps, IOwnState> = {
  componentDidUpdate(prevProps: CommonListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid,
      },
      {
        companyUid: prevProps.companyUid,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const CommonList = compose(
  setDisplayName('CommonList'),
  withUser,
  withCommonSystem,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(CommonListView);