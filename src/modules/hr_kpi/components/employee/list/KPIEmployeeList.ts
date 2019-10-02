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

import { IKPIEmployeeGetAllFilter } from '@kpi/classes/filter';
import { IKPIEmployee } from '@kpi/classes/response';
import { KPIEmployeeField } from '@kpi/classes/types';
import { withKPIEmployee, WithKPIEmployee } from '@kpi/hoc/withKPIEmployee';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ICollectionValue } from '@layout/classes/core';
import { IKPIEmployeeFilterResult } from './KPIEmployeeFilter';
import { KPIEmployeeListView } from './KPIEmployeeListView';

interface IOwnRouteParams {
}

interface IOwnOption {
}

interface IOwnState extends IKPIEmployeeFilterResult {
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
  handleOnBind: (item: IKPIEmployee, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IKPIEmployeeFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type KPIEmployeeListProps 
  = IOwnOption
  & RouteComponentProps<IOwnRouteParams>
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithKPIEmployee
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPIEmployeeListProps, IOwnState> = (props: KPIEmployeeListProps): IOwnState => {
  const { request } = props.kpiEmployeeState.all;
  
  const state: IOwnState = {
    isFilterOpen: false,
    status: 'pending',
    fields: Object.keys(KPIEmployeeField).map(key => ({
      value: key,
      name: KPIEmployeeField[key]
    }))
  };

  if (request && request.filter) {
    state.statusTypes = request.filter.statusTypes,
    state.status = request.filter.status;
  }

  return state;
};

const stateUpdaters: StateUpdaters<KPIEmployeeListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: IKPIEmployeeFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<KPIEmployeeListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIEmployeeListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.kpiEmployeeState.all;
    const { loadAllRequest } = props.kpiEmployeeDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPIEmployeeGetAllFilter = {
        statusTypes: props.statusTypes,
        status: props.status,
        isFinal: props.isFinal,
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
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: KPIEmployeeListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.kpiEmployeeState.all;
    const { loadAllRequest } = props.kpiEmployeeDispatch;
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
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    }
  },
  handleOnBind: (props: KPIEmployeeListProps) => (item: IKPIEmployee, index: number) => ({
    key: index,
    primary: item.kpiAssign && item.kpiAssign.employee && item.kpiAssign.employee.fullName || '',
    secondary: item.kpiAssign && item.kpiAssign.year.toString() || '',
    tertiary: item.period === 1 && props.intl.formatMessage(kpiMessage.employee.field.periodMidYear) || props.intl.formatMessage(kpiMessage.employee.field.periodFullYear),
    quaternary: `${props.intl.formatNumber(item.totalScore)} %`,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
  handleFilterVisibility: (props: KPIEmployeeListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: KPIEmployeeListProps) => (filter: IKPIEmployeeGetAllFilter) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: KPIEmployeeListProps) => () => {
    return props.statusTypes !== undefined || 
      props.status !== 'pending' ||
      props.isFinal !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIEmployeeListProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIEmployeeListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        statusTypes: this.props.statusTypes,
        status: this.props.status,
        isFinal: this.props.isFinal,
      },
      {
        statusTypes: prevProps.statusTypes,
        status: prevProps.status,
        isFinal: prevProps.isFinal,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const KPIEmployeeList = compose(
  setDisplayName('KPIEmployeeList'),
  withUser,
  withKPIEmployee,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(KPIEmployeeListView);