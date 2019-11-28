import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCompetencyAssessmentGetAllFilter } from '@hr/classes/filters';
import { IHrCompetencyAssessment } from '@hr/classes/response';
import { IHrCompetencyField, IHrCompetencyStatus } from '@hr/classes/types';
import { WithHrCompetencyAssessment, withHrCompetencyAssessment } from '@hr/hoc/withHrCompetencyAssessment';
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

import { HrCompetencyAssessmentListView } from './HrCompetencyAssessmentListView';

interface IOwnOption {
  
}

interface IOwnRoute {
  employeeUid: string;
}

interface IOwnState {
  fields: ICollectionValue[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IHrCompetencyAssessment, index: number) => IDataBindResult;
}

export type HrCompetencyAssessmentListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps<IOwnRoute>
  & WithStyles<typeof styles>
  & WithUser
  & WithHrCompetencyAssessment;

const createProps: mapper<IOwnOption, IOwnState> = (props: HrCompetencyAssessmentListProps): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IHrCompetencyField).map(key => ({
      value: key,
      name: IHrCompetencyField[key]
    })),
  };

  return state;
};

const stateUpdaters: StateUpdaters<HrCompetencyAssessmentListProps, IOwnState, IOwnStateUpdater> = {

};

const handlerCreators: HandleCreators<HrCompetencyAssessmentListProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyAssessmentListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.hrCompetencyAssessmentDispatch;
    const { isExpired, isLoading, request } = props.hrCompetencyAssessmentState.all;

    if (props.userState.user && !isLoading) {
      const filter: IHrCompetencyAssessmentGetAllFilter = {
        find: request && request.filter && request.filter.find,
        findBy: request && request.filter && request.filter.findBy,
        orderBy: params && params.orderBy || request && request.filter && request.filter.orderBy,
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size,
        employeeUid: props.match.params.employeeUid
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
  handleOnLoadApiSearch: (props: HrCompetencyAssessmentListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.hrCompetencyAssessmentState.all;
    const { loadAllRequest } = props.hrCompetencyAssessmentDispatch;
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
  handleOnBind: () => (item: IHrCompetencyAssessment, index: number) => ({
    key: index,
    primary: item.employee.fullName,
    secondary: item.company && item.company.name || 'N/A',
    tertiary: item.position && item.position.name || 'N/A',
    quaternary: IHrCompetencyStatus[item.statusType],
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyAssessmentListProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyAssessmentListProps) {
    // 
  }
};

export const HrCompetencyAssessmentList = compose<HrCompetencyAssessmentListProps, IOwnOption>(
  setDisplayName('HrCompetencyAssessmentList'),
  withUser,
  withRouter,
  withHrCompetencyAssessment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(HrCompetencyAssessmentListView);