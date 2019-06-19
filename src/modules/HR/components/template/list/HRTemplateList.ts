import { IBasePagingFilter } from '@generic/interfaces';
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

import { IHRTemplateGetAllFilter } from '@hr/classes/filter';
import { IHRTemplate } from '@hr/classes/response';
import { HRTemplateField } from '@hr/classes/types';
import { withHRTemplate, WithHRTemplate } from '@hr/hoc/withHRTemplate';
import { IHRTemplateFilterResult } from './HRTemplateListFilter';
import { HRTemplateListView } from './HRTemplateListView';

interface IOwnOption {

}

interface IOwnState extends IHRTemplateFilterResult {
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
  handleOnBind: (item: IHRTemplate, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IHRTemplateFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type HRTemplateListProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithHRTemplate
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<HRTemplateListProps, IOwnState> = (props: HRTemplateListProps): IOwnState => {
  const { request } = props.hrTemplateState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(HRTemplateField).map(key => ({
      value: key,
      name: HRTemplateField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid,
    state.positionUid = request.filter.positionUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<HRTemplateListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IHRTemplateFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<HRTemplateListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HRTemplateListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.hrTemplateState.all;
    const { loadAllRequest } = props.hrTemplateDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IHRTemplateGetAllFilter = {
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
  handleOnLoadApiSearch: (props: HRTemplateListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrTemplateState.all;
    const { loadAllRequest } = props.hrTemplateDispatch;
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
  handleOnBind: (props: HRTemplateListProps) => (item: IHRTemplate, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.company && item.company.name || 'N/A',
    tertiary: item.position && item.position.name || 'N/A',
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
  handleFilterVisibility: (props: HRTemplateListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: HRTemplateListProps) => (filter: IHRTemplateFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: HRTemplateListProps) => () => {
    return props.companyUid !== undefined ||
      props.positionUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<HRTemplateListProps, IOwnState> = {
  componentDidUpdate(prevProps: HRTemplateListProps) {
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

export const HRTemplateList = compose(
  setDisplayName('HRTemplateList'),
  withUser,
  withHRTemplate,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(HRTemplateListView);