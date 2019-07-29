import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, witKPIouter } from 'react-router';
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

import { IKPITemplateGetAllFilter } from '@KPI/classes/filter';
import { IKPITemplate } from '@KPI/classes/response';
import { KPITemplateField } from '@KPI/classes/types';
import { withKPITemplate, WithKPITemplate } from '@KPI/hoc/withKPITemplate';
import { IKPITemplateFilterResult } from './KPITemplateListFilter';
import { KPITemplateListView } from './KPITemplateListView';

interface IOwnOption {

}

interface IOwnState extends IKPITemplateFilterResult {
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
  handleOnBind: (item: IKPITemplate, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IKPITemplateFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type KPITemplateListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithKPITemplate
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPITemplateListProps, IOwnState> = (props: KPITemplateListProps): IOwnState => {
  const { request } = props.KPITemplateState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(KPITemplateField).map(key => ({
      value: key,
      name: KPITemplateField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid,
    state.positionUid = request.filter.positionUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<KPITemplateListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IKPITemplateFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<KPITemplateListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPITemplateListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.KPITemplateState.all;
    const { loadAllRequest } = props.KPITemplateDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPITemplateGetAllFilter = {
        companyUid: props.companyUid,
        positionUid: props.companyUid ? props.positionUid : undefined,
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
  handleOnLoadApiSearch: (props: KPITemplateListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.KPITemplateState.all;
    const { loadAllRequest } = props.KPITemplateDispatch;
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
  handleOnBind: (props: KPITemplateListProps) => (item: IKPITemplate, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.company && item.company.name || 'N/A',
    tertiary: item.position && item.position.name || 'N/A',
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
  handleFilterVisibility: (props: KPITemplateListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: KPITemplateListProps) => (filter: IKPITemplateFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: KPITemplateListProps) => () => {
    return props.companyUid !== undefined ||
      props.positionUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<KPITemplateListProps, IOwnState> = {
  componentDidUpdate(prevProps: KPITemplateListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid,
        positionUid: this.props.positionUid
      },
      {
        companyUid: prevProps.companyUid,
        positionUid: prevProps.positionUid
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const KPITemplateList = compose(
  setDisplayName('KPITemplateList'),
  withUser,
  withKPITemplate,
  witKPIouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(KPITemplateListView);