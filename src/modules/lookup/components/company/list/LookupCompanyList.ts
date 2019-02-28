import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompanyGetAllFilter } from '@lookup/classes/filters/company';
import { ICompany } from '@lookup/classes/response';
import { CompanyField } from '@lookup/classes/types';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, setDisplayName, shallowEqual, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupCompanyListView } from './LookupCompanyListView';

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: ICompany, index: number) => IDataBindResult;
}

export type LookupCompanyListProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithUser
  & WithLookupCompany
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<LookupCompanyListProps, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(CompanyField).map(key => ({
      value: key,
      name: CompanyField[key]
    }))
  };

  return state;
};

const stateUpdaters: StateUpdaters<LookupCompanyListProps, IOwnState, {}> = {
};

const handlerCreators: HandleCreators<LookupCompanyListProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupCompanyListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.lookupCompanyState.all;
    const { loadAllRequest } = props.lookupCompanyDispatch;
    const { user } = props.userState;

    if (user && !isLoading) {
      // predefined filter
      const filter: ILookupCompanyGetAllFilter = {
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
          filter
        });
      }
    }
  },
  handleOnLoadApiSearch: (props: LookupCompanyListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.lookupCompanyState.all;
    const { loadAllRequest } = props.lookupCompanyDispatch;
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
  handleOnBind: (props: LookupCompanyListProps) => (item: ICompany, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.code,
    tertiary: item.name,
    quaternary: '',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

export const LookupCompanyList = compose(
  setDisplayName('LookupCompanyList'),
  withUser,
  withLookupCompany,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(LookupCompanyListView);