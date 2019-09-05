import { IBasePagingFilter } from '@generic/interfaces';
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

import { IKPIAssignGetAllFilter } from '@kpi/classes/filter';
import { IKPIAssign } from '@kpi/classes/response';
import { KPIAssignField } from '@kpi/classes/types/assign/KPIAssignField';
import { WithKPIAssign, withKPIAssign } from '@kpi/hoc/withKPIAssign';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ICollectionValue } from '@layout/classes/core';
import { IKPIAssignFilterResult } from './KPIAssignFilter';
import { KPIAssignListView } from './KPIAssignListView';

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnOption {
}

interface IOwnState extends IKPIAssignFilterResult {
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
  handleOnBind: (item: IKPIAssign, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IKPIAssignFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type KPIAssignListProps 
  = IOwnOption
  & RouteComponentProps<IOwnRouteParams>
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithKPIAssign
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPIAssignListProps, IOwnState> = (props: KPIAssignListProps): IOwnState => {
  const { request } = props.kpiAssignState.all;

  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(KPIAssignField).map(key => ({
      value: key,
      name: KPIAssignField[key]
    }))
  };

  if (request && request.filter) {
    state.isFinal = request.filter.isFinal;
  }

  return state;
};

const stateUpdaters: StateUpdaters<KPIAssignListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IKPIAssignFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<KPIAssignListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIAssignListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.kpiAssignState.all;
    const { loadAllRequest } = props.kpiAssignDispatch;
    const { user } = props.userState;

    if (user && !isLoading && props.match.params.employeeUid) {
      // predefined filter
      const filter: IKPIAssignGetAllFilter = {
        isFinal: props.isFinal || undefined,
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      const isEmployeeChanged = !shallowEqual(props.match.params.employeeUid, request && request.employeeUid || '');
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry || isEmployeeChanged) {
        loadAllRequest({
          filter,
          employeeUid: props.match.params.employeeUid
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: KPIAssignListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.kpiAssignState.all;
    const { loadAllRequest } = props.kpiAssignDispatch;
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
          filter,
          employeeUid : props.match.params.employeeUid
        });
      }
    }
  },
  handleOnBind: (props: KPIAssignListProps) => (item: IKPIAssign, index: number) => ({
    key: index,
    primary: item.employee && item.employee.fullName || '',
    secondary: item.year.toString(),
    tertiary: item.template && item.template.name || '',
    quaternary: item.isFinal && props.intl.formatMessage(kpiMessage.employee.field.isFinalTrue) || props.intl.formatMessage(kpiMessage.employee.field.isFinalFalse),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
  handleFilterVisibility: (props: KPIAssignListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: KPIAssignListProps) => (filter: IKPIAssignFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: KPIAssignListProps) => () => {
    return props.isFinal !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIAssignListProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIAssignListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        isFinal: this.props.isFinal
      },
      {
        isFinal: prevProps.isFinal,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const KPIAssignList = compose(
  setDisplayName('KPIAssignList'),
  withUser,
  withKPIAssign,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(KPIAssignListView);