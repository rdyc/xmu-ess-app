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

import { IKPIApprovalGetAllFilter } from '@kpi/classes/filter/approval';
import { IKPIEmployee } from '@kpi/classes/response';
import { KPIEmployeeField } from '@kpi/classes/types';
import { WithKPIApproval, withKPIApproval } from '@kpi/hoc/withKPIApproval';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ICollectionValue } from '@layout/classes/core';
import { IKPIApprovalFilterResult } from './KPIApprovalFilter';
import { KPIApprvoalListView } from './KPIApprovalListView';

interface IOwnRouteParams {
}

interface IOwnOption {
}

interface IOwnState extends IKPIApprovalFilterResult {
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
  handleFilterApplied: (filter: IKPIApprovalFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type KPIApprovalListProps 
  = IOwnOption
  & RouteComponentProps<IOwnRouteParams>
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithKPIApproval
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<KPIApprovalListProps, IOwnState> = (props: KPIApprovalListProps): IOwnState => {
  const { request } = props.kpiApprovalState.all;
  
  const state: IOwnState = {
    isFilterOpen: false,
    status: 'pending',
    fields: Object.keys(KPIEmployeeField).map(key => ({
      value: key,
      name: KPIEmployeeField[key]
    }))
  };

  if (request && request.filter) {
    state.companyUid = request.filter.companyUid,
    state.statusTypes = request.filter.statusTypes,
    state.status = request.filter.status;
  }

  return state;
};

const stateUpdaters: StateUpdaters<KPIApprovalListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: IKPIApprovalFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  
};

const handlerCreators: HandleCreators<KPIApprovalListProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIApprovalListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.kpiApprovalState.all;
    const { loadAllRequest } = props.kpiApprovalDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IKPIApprovalGetAllFilter = {
        companyUid: props.companyUid,
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
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: KPIApprovalListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.kpiApprovalState.all;
    const { loadAllRequest } = props.kpiApprovalDispatch;
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
        });
      }
    }
  },
  handleOnBind: (props: KPIApprovalListProps) => (item: IKPIEmployee, index: number) => ({
    key: index,
    primary: item.kpiAssign && item.kpiAssign.employee && item.kpiAssign.employee.fullName || '',
    secondary: item.kpiAssign && item.kpiAssign.year.toString() || '',
    tertiary: item.period === 1 && props.intl.formatMessage(kpiMessage.employee.field.periodMidYear) || props.intl.formatMessage(kpiMessage.employee.field.periodFullYear),
    quaternary: `${props.intl.formatNumber(item.totalScore)} %`,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
  }),
  handleFilterVisibility: (props: KPIApprovalListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: KPIApprovalListProps) => (filter: IKPIApprovalGetAllFilter) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: KPIApprovalListProps) => () => {
    return props.companyUid !== undefined ||
      props.statusTypes !== undefined || 
      props.status !== 'pending' ||
      props.isFinal !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIApprovalListProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIApprovalListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid,
        statusTypes: this.props.statusTypes,
        status: this.props.status,
        isFinal: this.props.isFinal,
      },
      {
        companyUid: prevProps.companyUid,
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

export const KPIApprovalList = compose(
  setDisplayName('KPIApprovalList'),
  withUser,
  withKPIApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(KPIApprvoalListView);