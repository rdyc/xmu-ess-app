import { IBasePagingFilter } from '@generic/interfaces';
import { IAccountEmployeeCompetencyGetAllFilter } from '@hr/classes/filters';
import { IAccountEmployeeCompetency } from '@hr/classes/response';
import { IHrCompetencyField } from '@hr/classes/types';
import { WithHrCompetencyAssessment, withHrCompetencyAssessment } from '@hr/hoc/withHrCompetencyAssessment';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
// import * as moment from 'moment';
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

import { IEmployeeCompetencyFilterResult } from './EmployeeCompetencyFilter';
import { EmployeeCompetencyListView } from './EmployeeCompetencyListView';

interface IOwnOption {
  
}

interface IOwnState extends IEmployeeCompetencyFilterResult {
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
  handleOnBind: (item: IAccountEmployeeCompetency, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: IEmployeeCompetencyFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type EmployeeCompetencyListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCompetencyAssessment;

const createProps: mapper<IOwnOption, IOwnState> = (props: EmployeeCompetencyListProps): IOwnState => {
  const { request } = props.hrCompetencyAssessmentState.employee;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
    isActive: false
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.year = request.filter.year,
    state.companyUid = request.filter.companyUid,
    state.isAssess = request.filter.isAssess,
    state.isActive = !request.filter.isActive;
  }

  return state;
};

const stateUpdaters: StateUpdaters<EmployeeCompetencyListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: IEmployeeCompetencyFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<EmployeeCompetencyListProps, IOwnHandler> = {
  handleOnLoadApi: (props: EmployeeCompetencyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadEmployeeRequest } = props.hrCompetencyAssessmentDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyAssessmentState.employee;

    if (props.userState.user && !isLoading) {
      const filter: IAccountEmployeeCompetencyGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size,
        year: props.year,
        companyUid: props.companyUid,
        isAssess: props.isAssess,
        isActive: !props.isActive
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (isExpired || shouldLoad || isRetry) {
        loadEmployeeRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: EmployeeCompetencyListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCompetencyAssessmentState.employee;
    const { loadEmployeeRequest } = props.hrCompetencyAssessmentDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
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
        loadEmployeeRequest({
          filter
        });
      }
    }
  },
  handleOnBind: (props: EmployeeCompetencyListProps) => (item: IAccountEmployeeCompetency, index: number) => ({
    key: index,
    primary: item.fullName,
    secondary: item.company && item.company.name || 'N/A',
    tertiary: props.intl.formatDate(item.joinDate, GlobalFormat.Date),
    quaternary: item.employment && item.employment.value || item.employmentType,
    quinary: item.email,
    senary: ''
  }),
  handleFilterVisibility: (props: EmployeeCompetencyListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: EmployeeCompetencyListProps) => (filter: IEmployeeCompetencyFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: EmployeeCompetencyListProps) => () => {
    return props.year !== undefined ||
      props.companyUid !== undefined ||
      props.isAssess === true ||
      props.isActive === true;
  },
};

const lifecycles: ReactLifeCycleFunctions<EmployeeCompetencyListProps, IOwnState> = {
  componentDidUpdate(prevProps: EmployeeCompetencyListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        year: this.props.year,
        companyUid: this.props.companyUid,
        isAssess: this.props.isAssess,
        isActive: this.props.isActive,
      },
      {
        year: prevProps.year,
        companyUid: prevProps.companyUid,
        isAssess: prevProps.isAssess,
        isActive: prevProps.isActive,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const EmployeeCompetencyList = compose<EmployeeCompetencyListProps, IOwnOption>(
  setDisplayName('EmployeeCompetencyList'),
  withUser,
  withRouter,
  withHrCompetencyAssessment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(EmployeeCompetencyListView);