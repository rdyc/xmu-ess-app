import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IDiemAllFilter } from '@lookup/classes/filters';
import { IDiem } from '@lookup/classes/response';
import { LookupDiemField } from '@lookup/classes/types/diem/DiemField';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
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
import { ILookupDiemListFilterResult } from './LookupDiemListFilter';
import { LookupDiemListView } from './LookupDiemListView';

interface IOwnOption {

}

interface IOwnState extends ILookupDiemListFilterResult {
  fields: ICollectionValue[];
  isFilterOpen: boolean;
  // selected: string[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
  // setSelection: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IDiem, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILookupDiemListFilterResult) => void;
  handleFilterBadge: () => boolean;
  // handleSelection: (values: string[]) => void;
  // handleDisableSelection: (item: IProject) => boolean;
}

export type LookupDiemListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupDiem
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupDiemListProps, IOwnState> = (props: LookupDiemListProps): IOwnState => {
  const { request } = props.lookupDiemState.all;

  // default state
  const state: IOwnState = {
    isFilterOpen: false,
    // selected: [],
    fields: Object.keys(LookupDiemField).map(key => ({
      value: key,
      name: LookupDiemField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.projectType = request.filter.projectType,
      state.destinationType = request.filter.destinationType;
  }

  return state;
};

const stateUpdaters: StateUpdaters<LookupDiemListProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupDiemListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
  // setSelection: (state: IOwnState) => (values?: string[]): Partial<IOwnState> => ({
  //   selected: values
  // }),
};

const handlerCreators: HandleCreators<LookupDiemListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupDiemListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.lookupDiemState.all;
    const { loadAllRequest } = props.lookupDiemDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IDiemAllFilter = {
        projectType: props.projectType,
        destinationType: props.destinationType,
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
      if (shouldLoad || isRetry) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: LookupDiemListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.lookupDiemState.all;
    const { loadAllRequest } = props.lookupDiemDispatch;

    if (props.userState.user && !isLoading) {
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
  handleOnBind: (props: LookupDiemListProps) => (item: IDiem, index: number) => ({
    key: index,
    primary: item.company && item.company.name || item.companyUid,
    secondary: item.project && item.project.value || item.projectType,
    tertiary: item.destination && item.destination.value || item.destinationType,
    quaternary: props.intl.formatNumber(item.value),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LookupDiemListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LookupDiemListProps) => (filter: ILookupDiemListFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LookupDiemListProps) => () => {
    return props.projectType !== undefined ||
      props.destinationType !== undefined;
  },
  // handleSelection: (props: ProjectRegistrationListProps) => (values: string[]) => {
  //   console.log(values);
  // },
  // handleDisableSelection: (props: ProjectRegistrationListProps) => (item: IProject): boolean => {
  //   return item.statusType === 'SST03';
  // }
};

const lifecycles: ReactLifeCycleFunctions<LookupDiemListProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupDiemListProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        projectType: this.props.projectType,
        destinationType: this.props.destinationType,
      },
      {
        projectType: prevProps.projectType,
        destinationType: prevProps.destinationType,
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const LookupDiemList = compose(
  setDisplayName('LookupDiemList'),
  withUser,
  withLookupDiem,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LookupDiemListView);