import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCompetencyEmployeeGetAllFilter } from '@hr/classes/filters';
import { IHrCompetencyEmployee } from '@hr/classes/response';
import { IHrCompetencyField, IHrCompetencyStatus } from '@hr/classes/types';
import { WithHrCompetencyResult, withHrCompetencyResult } from '@hr/hoc/withHrCompetencyResult';
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
import { IHrCompetencyResultFilterResult } from './HrCompetencyResultFilter';
import { HrCompetencyResultListView } from './HrCompetencyResultListView';

interface IOwnOption {
  
}

interface IOwnState extends IHrCompetencyResultFilterResult {
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
  handleFilterApplied: (filter: IHrCompetencyResultFilterResult) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterBadge: () => boolean;
}

export type HrCompetencyResultListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCompetencyResult;

const createProps: mapper<IOwnOption, IOwnState> = (props: HrCompetencyResultListProps): IOwnState => {
  const { request } = props.hrCompetencyResultState.all;

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
    state.assessmentYear = request.filter.assessmentYear,
    state.companyUid = request.filter.companyUid,
    state.positionUid = request.filter.positionUid,
    state.status = request.filter.status;
  }

  return state;
};

const stateUpdaters: StateUpdaters<HrCompetencyResultListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IHrCompetencyResultFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<HrCompetencyResultListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyResultListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyResultDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyResultState.all;
    const { user } = props.userState;

    if (user && !isLoading) {
      const filter: IHrCompetencyEmployeeGetAllFilter = {
        isResult: true,
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size,
        status: props.status,
        assessmentYear: props.assessmentYear,
        companyUid: props.companyUid,
        positionUid: props.companyUid ? props.positionUid : undefined,
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
  handleOnLoadApiSearch: (props: HrCompetencyResultListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCompetencyResultState.all;
    const { loadAllRequest } = props.hrCompetencyResultDispatch;
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
  handleFilterVisibility: (props: HrCompetencyResultListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: HrCompetencyResultListProps) => (filter: IHrCompetencyResultFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: HrCompetencyResultListProps) => () => {
    return props.assessmentYear !== undefined ||
    props.companyUid !== undefined ||
    props.positionUid !== undefined ||
    props.status !== 'pending';
  },
  handleOnBind: () => (item: IHrCompetencyEmployee, index: number) => ({
    key: index,
    primary: item.responden && item.responden.fullName || 'N/A',
    secondary: item.company && item.company.name || 'N/A',
    tertiary: item.position && item.position.name || 'N/A',
    quaternary: IHrCompetencyStatus[item.statusType],
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyResultListProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyResultListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        status: this.props.status,
        year: this.props.assessmentYear,
        companyUid: this.props.companyUid,
        positionUid: this.props.positionUid
      },
      {
        status: prevProps.status,
        year: prevProps.assessmentYear,
        companyUid: prevProps.companyUid,
        positionUid: prevProps.positionUid
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const HrCompetencyResultList = compose<HrCompetencyResultListProps, IOwnOption>(
  setDisplayName('HrCompetencyResultList'),
  withUser,
  withRouter,
  withHrCompetencyResult,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(HrCompetencyResultListView);