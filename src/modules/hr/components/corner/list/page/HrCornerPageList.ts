import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCornerPageGetAllFilter } from '@hr/classes/filters';
import { IHrCornerPage } from '@hr/classes/response';
import { IHrCompetencyField } from '@hr/classes/types';
import { WithHrCornerPage, withHrCornerPage } from '@hr/hoc/withHrCornerPage';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
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

import { HrCornerPageListView } from './HrCornerPageListView';

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
  handleOnBind: (item: IHrCornerPage, index: number) => IDataBindResult;
}

export type HrCornerPageListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCornerPage;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
  };

  return state;
};

const stateUpdaters: StateUpdaters<HrCornerPageListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<HrCornerPageListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCornerPageListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCornerPageDispatch;
    const { isExpired, isLoading, request } = props.hrCornerPageState.all;

    if (props.userState.user && !isLoading) {
      const filter: IHrCornerPageGetAllFilter = {
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
  handleOnLoadApiSearch: (props: HrCornerPageListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCornerPageState.all;
    const { loadAllRequest } = props.hrCornerPageDispatch;
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
  handleOnBind: (props: HrCornerPageListProps) => (item: IHrCornerPage, index: number) => ({
    key: index,
    primary: item.category.name,
    secondary: item.title,
    tertiary: item.headline,
    quaternary: props.intl.formatDate(item.start, GlobalFormat.Date),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

export const HrCornerPageList = compose<HrCornerPageListProps, IOwnOption>(
  setDisplayName('HrCornerPageList'),
  withUser,
  withRouter,
  withHrCornerPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(HrCornerPageListView);