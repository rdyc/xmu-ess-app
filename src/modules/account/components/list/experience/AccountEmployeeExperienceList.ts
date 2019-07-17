import { IEmployeeExperienceAllFilter } from '@account/classes/filters/employeeExperience';
import { IEmployeeExperience } from '@account/classes/response/employeeExperience';
import { AccountEmployeeField } from '@account/classes/types/AccountEmployeeField';
import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
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
import { AccountEmployeeExperienceListView } from './AccountEmployeeExperienceListView';

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
  handleOnBind: (item: IEmployeeExperience, index: number) => IDataBindResult;
}

export type AccountEmployeeExperienceListProps 
  = IOwnRouteParams
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithAccountEmployeeExperience
  & InjectedIntlProps
  & RouteComponentProps<IOwnRouteParams>;

const createProps: mapper<AccountEmployeeExperienceListProps, IOwnState> = (): IOwnState => {  
  // default state
  const state: IOwnState = {
    fields: Object.keys(AccountEmployeeField).map(key => ({ 
      value: key, 
      name: AccountEmployeeField[key] 
    }))
  };
  
  return state;
};

const stateUpdaters: StateUpdaters<AccountEmployeeExperienceListProps, IOwnState, IOwnStateUpdater> = {
  
};

const handlerCreators: HandleCreators<AccountEmployeeExperienceListProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeExperienceListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isExpired, isLoading, request } = props.accountEmployeeExperienceState.all;
    const { loadAllRequest } = props.accountEmployeeExperienceDispatch;

    if (props.userState.user && !isLoading) {
      // predefined filter
      const filter: IEmployeeExperienceAllFilter = {
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
          employeeUid: props.match.params.employeeUid,
        });
      }
    }
  },
  handleOnBind: () => (item: IEmployeeExperience, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.company,
    tertiary: item.position,
    quaternary: item.profession && item.profession.value || 'N/A',
    quinary: `${item.start.toString()} - ${item.end.toString()}`,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeExperienceListProps, IOwnState> = {
  componentDidMount() {
    if (this.props.location.state) {
    //   if (this.props.location.state.employeeName) {

    //   }
    }
  },
  componentDidUpdate() {
    //
  }
};

export const AccountEmployeeExperienceList = compose(
  setDisplayName('AccountEmployeeExperienceList'),
  withUser,
  withAccountEmployeeExperience,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(AccountEmployeeExperienceListView);