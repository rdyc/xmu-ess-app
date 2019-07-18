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
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IEmployeeTrainingAllFilter } from '@account/classes/filters/employeeTraining';
import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { AccountEmployeeField } from '@account/classes/types/AccountEmployeeField';
import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { AccountEmployeeTrainingListView } from './AccountEmployeeTrainingListView';

interface IOwnOption {
  employeeId?: string;
}

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
  handleOnBind: (item: IEmployeeTraining, index: number) => IDataBindResult;
}

export type AccountEmployeeTrainingListProps 
  = IOwnRouteParams
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeTraining
  & InjectedIntlProps
  & RouteComponentProps<IOwnRouteParams>;

const createProps: mapper<AccountEmployeeTrainingListProps, IOwnState> = (props: AccountEmployeeTrainingListProps): IOwnState => {  
  // default state
  const state: IOwnState = {
    fields: Object.keys(AccountEmployeeField).map(key => ({ 
      value: key, 
      name: AccountEmployeeField[key] 
    }))
  };
  
  return state;
};

const stateUpdaters: StateUpdaters<AccountEmployeeTrainingListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<AccountEmployeeTrainingListProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeTrainingListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.accountEmployeeTrainingState.all;
    const { loadAllRequest } = props.accountEmployeeTrainingDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeTrainingAllFilter = {
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
        if (props.employeeId) {
          loadAllRequest({
            filter,
            employeeUid: props.employeeId,
          });
        } else {
          loadAllRequest({
            filter,
            employeeUid: props.match.params.employeeUid,
          });
        }
      }
    }
  },
  handleOnBind: (props: AccountEmployeeTrainingListProps) => (item: IEmployeeTraining, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.training ? item.training.value : 'N/A',
    quaternary: item.certification ? item.certification.value : 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingListProps, IOwnState> = {
  componentDidMount() {
    const { employeeId, employeeUid, handleOnLoadApi } = this.props;
    const { request } = this.props.accountEmployeeTrainingState.all;
    if (request) {
      if (request.employeeUid !== employeeId || request.employeeUid !== employeeUid) {
        handleOnLoadApi(undefined, true, true);
      }
    }
  },
  componentDidUpdate(prevProps: AccountEmployeeTrainingListProps) {
    //
  }
};

export const AccountEmployeeTrainingList = compose<AccountEmployeeTrainingListProps, IOwnOption>(
  setDisplayName('AccountEmployeeTrainingList'),
  withUser,
  withAccountEmployeeTraining,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(AccountEmployeeTrainingListView);