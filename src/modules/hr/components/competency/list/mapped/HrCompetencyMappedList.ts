import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCompetencyMappedGetAllFilter } from '@hr/classes/filters';
import { IHrCompetencyMapped } from '@hr/classes/response';
import { IHrCompetencyField } from '@hr/classes/types';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
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
  mapper,
  setDisplayName,
  shallowEqual,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { HrCompetencyMappedListView } from './HrCompetencyMappedListView';

interface IOwnOption {
  
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {

}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IHrCompetencyMapped, index: number) => IDataBindResult;
}

export type HrCompetencyMappedListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCompetencyMapped;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
  };

  return state;
};

const stateUpdaters: StateUpdaters<HrCompetencyMappedListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<HrCompetencyMappedListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyMappedListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyMappedDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyMappedState.all;

    if (props.userState.user && !isLoading) {
      const filter: IHrCompetencyMappedGetAllFilter = {
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
  handleOnLoadApiSearch: (props: HrCompetencyMappedListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCompetencyMappedState.all;
    const { loadAllRequest } = props.hrCompetencyMappedDispatch;
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
  handleOnBind: () => (item: IHrCompetencyMapped, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.position.company.name,
    tertiary: item.position.name,
    quaternary: item.category.name,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

export const HrCompetencyMappedList = compose<HrCompetencyMappedListProps, IOwnOption>(
  setDisplayName('HrCompetencyMappedList'),
  withUser,
  withRouter,
  withHrCompetencyMapped,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(HrCompetencyMappedListView);