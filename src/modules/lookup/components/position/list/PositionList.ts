import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IPositionGetAllFilter } from '@lookup/classes/filters';
import { IPosition } from '@lookup/classes/response';
import { PositionField } from '@lookup/classes/types';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, shallowEqual, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { IPositionListFilterResult } from './PositionListFilter';
import { PositionListView } from './PositionListView';

interface IOwnOption {

}

interface IOwnState extends IPositionListFilterResult {
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
  handleOnBind: (item: IPosition, index: number) => IDataBindResult;

  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IPositionListFilterResult) => void;
}

export type PositionListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupPosition
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<PositionListProps, IOwnState> = (props: PositionListProps): IOwnState => {
  const { request } = props.lookupPositionState.all;
  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    fields: Object.keys(PositionField).map(key => ({
      value: key,
      name: PositionField[key]
    }))
  };
  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.companyUid = props.location.state.companyUid;
  } else {
    if (request && request.filter) {
      state.companyUid = request.filter.companyUid;
    }
  }
  return state;
};

const stateUpdaters: StateUpdaters<PositionListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: () => (filter: IPositionListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<PositionListProps, IOwnHandler> = {
  handleOnLoadApi: (props: PositionListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.lookupPositionState.all;
    const { loadAllRequest } = props.lookupPositionDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IPositionGetAllFilter = {
        companyUid: props.userState.user.company.uid,
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
          filter,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: PositionListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.lookupPositionState.all;
    const { loadAllRequest } = props.lookupPositionDispatch;

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
        loadAllRequest({
          filter,
        });
      }
    }
  },
  handleOnBind: (props: PositionListProps) => (item: IPosition, index: number) => ({
    key: index,
    primary: `${item.uid}` || '',
    secondary: `${item.name}` || '',
    tertiary: `${item.company && item.company.name}` || '',
    quaternary: item.isAllowMultiple ?
      props.intl.formatMessage(lookupMessage.position.field.isAllowed) :
      props.intl.formatMessage(lookupMessage.position.field.isNotAllowed)
    ,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),
  handleFilterVisibility: (props: PositionListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: PositionListProps) => (filter: IPositionListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: PositionListProps) => () => {
    return props.companyUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<PositionListProps, IOwnState> = {
  componentDidUpdate(prevProps: PositionListProps) {
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

export const PositionList = compose(
  setDisplayName('PositionList'),
  withUser,
  withLookupPosition,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(PositionListView);