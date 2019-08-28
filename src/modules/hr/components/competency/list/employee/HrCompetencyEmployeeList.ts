import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCompetencyEmployeeGetAllFilter } from '@hr/classes/filters';
import { IHrCompetencyEmployee } from '@hr/classes/response';
import { IHrCompetencyField } from '@hr/classes/types';
import { WithHrCompetencyEmployee, withHrCompetencyEmployee } from '@hr/hoc/withHrCompetencyEmployee';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
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
import { IHrCompetencyEmployeeFilterResult } from './HrCompetencyEmployeeFilter';
import { HrCompetencyEmployeeListView } from './HrCompetencyEmployeeListView';

interface IOwnOption {
  
}

interface IOwnState extends IHrCompetencyEmployeeFilterResult {
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
  handleOnBind: (item: IHrCompetencyEmployee, index: number) => IDataBindResult;

  // filter
  handleFilterApplied: (filter: IHrCompetencyEmployeeFilterResult) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterBadge: () => boolean;
}

export type HrCompetencyEmployeeListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCompetencyEmployee;

const createProps: mapper<IOwnOption, IOwnState> = (props: HrCompetencyEmployeeListProps): IOwnState => {
  const { request } = props.hrCompetencyEmployeeState.all;

  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
    isFilterOpen: false,
    status: 'pending'
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.status = request.filter.status;
  }

  return state;
};

const stateUpdaters: StateUpdaters<HrCompetencyEmployeeListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IHrCompetencyEmployeeFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<HrCompetencyEmployeeListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyEmployeeListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyEmployeeDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyEmployeeState.all;

    if (props.userState.user && !isLoading) {
      const filter: IHrCompetencyEmployeeGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size,
        // status: props.status
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
  handleOnLoadApiSearch: (props: HrCompetencyEmployeeListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCompetencyEmployeeState.all;
    const { loadAllRequest } = props.hrCompetencyEmployeeDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined,
        status: props.status
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
  handleFilterVisibility: (props: HrCompetencyEmployeeListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: HrCompetencyEmployeeListProps) => (filter: IHrCompetencyEmployeeFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: HrCompetencyEmployeeListProps) => () => {
    return props.status !== 'pending';
  },
  handleOnBind: () => (item: IHrCompetencyEmployee, index: number) => ({
    key: index,
    primary: item.responden && item.responden.fullName || 'N/A',
    secondary: item.position && item.position.company && item.position.company.name || 'N/A',
    tertiary: item.position && item.position.name || 'N/A',
    quaternary: 'YEAR',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyEmployeeListProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyEmployeeListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        status: this.props.status,
      },
      {
        status: prevProps.status
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const HrCompetencyEmployeeList = compose<HrCompetencyEmployeeListProps, IOwnOption>(
  setDisplayName('HrCompetencyEmployeeList'),
  withUser,
  withRouter,
  withHrCompetencyEmployee,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(HrCompetencyEmployeeListView);