import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
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
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IEmployeeNoteAllFilter } from '@account/classes/filters/employeeNote';
import { IEmployeeNote } from '@account/classes/response/employeeNote';
import { AccountEmployeeField } from '@account/classes/types/AccountEmployeeField';
import { WithAccountEmployeeNote, withAccountEmployeeNote } from '@account/hoc/withAccountEmployeeNote';
import { AccountEmployeeNoteListView } from './AccountEmployeeNoteListView';

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
 
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBind: (item: IEmployeeNote, index: number) => IDataBindResult;
}

export type AccountEmployeeNoteListProps 
  = IOwnRouteParams
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeNote
  & InjectedIntlProps
  & RouteComponentProps<IOwnRouteParams>;

const createProps: mapper<AccountEmployeeNoteListProps, IOwnState> = (props: AccountEmployeeNoteListProps): IOwnState => {  
  // default state
  const state: IOwnState = {
    fields: Object.keys(AccountEmployeeField).map(key => ({ 
      value: key, 
      name: AccountEmployeeField[key] 
    }))
  };
  
  return state;
};

const stateUpdaters: StateUpdaters<AccountEmployeeNoteListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<AccountEmployeeNoteListProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeNoteListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.accountEmployeeNoteState.all;
    const { loadAllRequest } = props.accountEmployeeNoteDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeNoteAllFilter = {
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
          filter,
          employeeUid: props.match.params.employeeUid,
        });
      }
    }
  },
  handleOnBind: (props: AccountEmployeeNoteListProps) => (item: IEmployeeNote, index: number) => ({
    key: index,
    primary: props.match.params.employeeUid,
    secondary: item.id.toString(),
    tertiary: item.text,
    quaternary: item.changes && props.intl.formatDate(item.changes.createdAt, GlobalFormat.Date) || 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeNoteListProps, IOwnState> = {
  componentDidMount() {
    const { request } = this.props.accountEmployeeNoteState.all;
    if (request && request.employeeUid !== this.props.match.params.employeeUid) {
      this.props.handleOnLoadApi(undefined, true, true);
    }
  }
};

export const AccountEmployeeNoteList = compose(
  setDisplayName('AccountEmployeeNoteList'),
  withUser,
  withAccountEmployeeNote,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(AccountEmployeeNoteListView);