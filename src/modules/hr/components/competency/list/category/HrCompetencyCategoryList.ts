import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCompetencyCategoryGetAllFilter } from '@hr/classes/filters';
import { IHrCompetencyCategory } from '@hr/classes/response';
import { IHrCompetencyField } from '@hr/classes/types';
import { WithHrCompetencyCategory, withHrCompetencyCategory } from '@hr/hoc/withHrCompetencyCategory';
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
import { IHrCompetencyCategoryFilterResult } from './HrCompetencyCategoryFilter';
import { HrCompetencyCategoryListView } from './HrCompetencyCategoryListView';

interface IOwnOption {
  
}

interface IOwnState extends IHrCompetencyCategoryFilterResult {
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
  handleOnBind: (item: IHrCompetencyCategory, index: number) => IDataBindResult;

  // filter
  handleFilterApplied: (filter: IHrCompetencyCategoryFilterResult) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterBadge: () => boolean;
}

export type HrCompetencyCategoryListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCompetencyCategory;

const createProps: mapper<IOwnOption, IOwnState> = (props: HrCompetencyCategoryListProps): IOwnState => {
  const { request } = props.hrCompetencyCategoryState.all;

  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
    isFilterOpen: true,
    clusterUid: ''
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.clusterUid = request.filter.clusterUid,
    state.isFilterOpen = false;
  }

  return state;
};

const stateUpdaters: StateUpdaters<HrCompetencyCategoryListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IHrCompetencyCategoryFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<HrCompetencyCategoryListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyCategoryListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyCategoryDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyCategoryState.all;

    if (props.userState.user && !isLoading && props.clusterUid) {
      const filter: IHrCompetencyCategoryGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size,
        clusterUid: props.clusterUid
      };

      // when request is defined, then compare the filter props
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if ((isExpired || shouldLoad || isRetry) && props.clusterUid) {
        loadAllRequest({
          filter,
          clusterUid: props.clusterUid
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: HrCompetencyCategoryListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCompetencyCategoryState.all;
    const { loadAllRequest } = props.hrCompetencyCategoryDispatch;
    const { user } = props.userState;

    if (user && !isLoading && props.clusterUid) {
      // predefined filter
      const filter = {
        ...request && request.filter,
        find,
        findBy,
        page: undefined,
        clusterUid: props.clusterUid
      };
      
      // compare request
      const shouldLoad = !shallowEqual(filter, request && request.filter || {});
      
      // only load when request parameter are differents
      if (shouldLoad) {
        loadAllRequest({
          filter,
          clusterUid: props.clusterUid
        });
      }
    }
  },
  handleFilterVisibility: (props: HrCompetencyCategoryListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: HrCompetencyCategoryListProps) => (filter: IHrCompetencyCategoryFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: HrCompetencyCategoryListProps) => () => {
    return props.clusterUid !== undefined && props.clusterUid !== '';
  },
  handleOnBind: () => (item: IHrCompetencyCategory, index: number) => ({
    key: index,
    primary: item.cluster.name,
    secondary: item.name,
    tertiary: `${item.levels.length === 0 ? 'No level recorded' : `${item.levels.length} ${item.levels.length < 2 ? 'level' : 'levels'}`}`,
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyCategoryListProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyCategoryListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        clusterUid: this.props.clusterUid,
      },
      {
        clusterUid: prevProps.clusterUid
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const HrCompetencyCategoryList = compose<HrCompetencyCategoryListProps, IOwnOption>(
  setDisplayName('HrCompetencyCategoryList'),
  withUser,
  withRouter,
  withHrCompetencyCategory,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(HrCompetencyCategoryListView);