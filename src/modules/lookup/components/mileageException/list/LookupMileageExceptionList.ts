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

import { IMileageExceptionAllFilter } from '@lookup/classes/filters';
import { IMileageException } from '@lookup/classes/response';
import { MileageExceptionField } from '@lookup/classes/types';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { ILookupMileageExceptionFilterResult } from './LookupMileageExceptionFilter';
import { LookupMileageExceptionListView } from './LookupMileageExceptionListView';

interface IOwnOption {

}

interface IOwnState extends ILookupMileageExceptionFilterResult {
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
  handleOnBind: (item: IMileageException, index: number) => IDataBindResult;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILookupMileageExceptionFilterResult) => void;
  handleFilterBadge: () => boolean;
}

export type LookupMileageExceptionProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupMileageException
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupMileageExceptionProps, IOwnState> = (props: LookupMileageExceptionProps): IOwnState => {
  const { request } = props.mileageExceptionState.all;

  const state: IOwnState = {
    isFilterOpen: false,
    fields: Object.keys(MileageExceptionField).map(key => ({
      value: key,
      name: MileageExceptionField[key]
    }))
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUid = request.filter.companyUid,
    state.roleUid = request.filter.roleUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<LookupMileageExceptionProps, IOwnState, IOwnStateUpdater> = {
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupMileageExceptionFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<LookupMileageExceptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupMileageExceptionProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.mileageExceptionState.all;
    const { loadAllRequest } = props.mileageExceptionDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: IMileageExceptionAllFilter = {
        companyUid: props.companyUid,
        roleUid: props.companyUid ? props.roleUid : undefined,
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
  handleOnLoadApiSearch: (props: LookupMileageExceptionProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.mileageExceptionState.all;
    const { loadAllRequest } = props.mileageExceptionDispatch;
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
  handleOnBind: (props: LookupMileageExceptionProps) => (item: IMileageException, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.role && item.role.company && item.role.company.name || 'N/A',
    tertiary: item.role.name,
    quaternary: item.reason ? item.reason : 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
  handleFilterVisibility: (props: LookupMileageExceptionProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LookupMileageExceptionProps) => (filter: ILookupMileageExceptionFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleFilterBadge: (props: LookupMileageExceptionProps) => () => {
    return props.companyUid !== undefined ||
      props.roleUid !== undefined;
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupMileageExceptionProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupMileageExceptionProps) {
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        companyUid: this.props.companyUid,
        roleUid: this.props.roleUid
      },
      {
        companyUid: prevProps.companyUid,
        roleUid: prevProps.roleUid
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi(undefined, true);
    }
  }
};

export const LookupMileageExceptionList = compose(
  setDisplayName('LookupMileageExceptionList'),
  withUser,
  withLookupMileageException,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupMileageExceptionListView);