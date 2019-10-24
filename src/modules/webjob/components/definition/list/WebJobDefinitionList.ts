import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobDefinitionGetAllFilter } from '@webjob/classes/filters';
import { IWebJobDefinition } from '@webjob/classes/response';
import { IWebJobRequestField } from '@webjob/classes/types';
import { withWebJobDefinition, WithWebJobDefinition } from '@webjob/hoc/withWebJobDefinition';
// import * as moment from 'moment';
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

import { WebJobDefinitionListView } from './WebJobDefinitionListView';

interface IOwnOption {
  
}

interface IOwnParams {
  // type: string;
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {

}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IWebJobDefinition, index: number) => IDataBindResult;
}

export type WebJobDefinitionListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps<IOwnParams>
  & WithStyles<typeof styles>
  & WithUser
  & WithWebJobDefinition;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IWebJobRequestField).map(key => ({
      value: key,
      name: IWebJobRequestField[key]
    })),
  };

  return state;
};

const stateUpdaters: StateUpdaters<WebJobDefinitionListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<WebJobDefinitionListProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobDefinitionListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.webJobDefinitionDispatch;
    const { isExpired, isLoading, request } = props.webJobDefinitionState.all;

    if (props.userState.user && !isLoading) {
      const filter: IWebJobDefinitionGetAllFilter = {
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
  handleOnLoadApiSearch: (props: WebJobDefinitionListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.webJobDefinitionState.all;
    const { loadAllRequest } = props.webJobDefinitionDispatch;
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
  handleOnBind: (props: WebJobDefinitionListProps) => (item: IWebJobDefinition, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.description,
    quaternary: item.assembly,
    quinary: item.version,
    senary: item.jobsCount.toString()
  }),
};

export const WebJobDefinitionList = compose<WebJobDefinitionListProps, IOwnOption>(
  setDisplayName('WebJobDefinitionList'),
  withUser,
  withRouter,
  withWebJobDefinition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(WebJobDefinitionListView);