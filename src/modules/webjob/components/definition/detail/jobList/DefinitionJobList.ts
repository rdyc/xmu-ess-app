import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobDefinitionJobGetAllFilter } from '@webjob/classes/filters';
import { IWebJobDefinitionJob } from '@webjob/classes/response';
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

import { DefinitionJobListView } from './DefinitionJobListView';

interface IOwnOption {
  
}

interface IOwnParams {
  definitionUid: string;
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {

}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBind: (item: IWebJobDefinitionJob, index: number) => IDataBindResult;
}

export type DefinitionJobListProps
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

const stateUpdaters: StateUpdaters<DefinitionJobListProps, IOwnState, IOwnStateUpdater> = {
};

const handlerCreators: HandleCreators<DefinitionJobListProps, IOwnHandler> = {
  handleOnLoadApi: (props: DefinitionJobListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { jobloadAllRequest } = props.webJobDefinitionDispatch;
    const { isExpired, isLoading, request } = props.webJobDefinitionState.jobAll;
    const { definitionUid } = props.match.params;

    if (props.userState.user && !isLoading) {
      const filter: IWebJobDefinitionJobGetAllFilter = {
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
        jobloadAllRequest({
          definitionUid,
          filter
        });
      }
    }
  },
  handleOnBind: (props: DefinitionJobListProps) => (item: IWebJobDefinitionJob, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.namespace,
    tertiary: '',
    quaternary: item.class,
    quinary: item.method,
    senary: ''
  }),
};

export const DefinitionJobList = compose<DefinitionJobListProps, IOwnOption>(
  setDisplayName('DefinitionJobList'),
  withUser,
  withRouter,
  withWebJobDefinition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(DefinitionJobListView);