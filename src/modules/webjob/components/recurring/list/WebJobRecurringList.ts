import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobRecurringGetAllFilter } from '@webjob/classes/filters';
import { IWebJobRecurringTriggerPayload } from '@webjob/classes/request';
import { IWebJobRecurring } from '@webjob/classes/response';
import { IWebJobRequestField } from '@webjob/classes/types';
import { WithWebJobMonitoring, withWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
import { withWebJobRecurring, WithWebJobRecurring } from '@webjob/hoc/withWebJobRecurring';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { FormikActions } from 'formik';
// import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { WebJobRecurringListView } from './WebJobRecurringListView';

export interface IRecurringTriggerFormValue {
  jobUid: string;
  name: string;
}

interface IOwnOption {
  
}

interface IOwnParams {

}

interface IOwnState {
  fields: ICollectionValue[];
  initialValues?: IRecurringTriggerFormValue;
  isTriggerOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setOpen: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnLoadApiSearch: (find?: string, findBy?: string) => void;
  handleOnBind: (item: IWebJobRecurring, index: number) => IDataBindResult;
  handleOnSubmit: (values: IRecurringTriggerFormValue, actions: FormikActions<IRecurringTriggerFormValue>) => void;
}

export type WebJobRecurringListProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & InjectedIntlProps
  & RouteComponentProps<IOwnParams>
  & WithStyles<typeof styles>
  & WithUser
  & WithMasterPage
  & WithWebJobMonitoring
  & WithWebJobRecurring;

const createProps: mapper<IOwnOption, IOwnState> = (props: WebJobRecurringListProps): IOwnState => {
  const state: IOwnState = {
    fields: Object.keys(IWebJobRequestField).map(key => ({
      value: key,
      name: IWebJobRequestField[key]
    })),
    initialValues: {
      jobUid: '',
      name: ''
    },
    isTriggerOpen: false,
  };

  return state;
};

const stateUpdaters: StateUpdaters<WebJobRecurringListProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: IRecurringTriggerFormValue): Partial<IOwnState> => ({
    initialValues: values
  }),
  setOpen: (prevState: IOwnState) => () => ({
    isTriggerOpen: !prevState.isTriggerOpen,
  })
};

const handlerCreators: HandleCreators<WebJobRecurringListProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobRecurringListProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { loadAllRequest } = props.webJobRecurringDispatch;
    const { isExpired, isLoading, request } = props.webJobRecurringState.all;

    if (props.userState.user && !isLoading) {
      const filter: IWebJobRecurringGetAllFilter = {
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
  handleOnLoadApiSearch: (props: WebJobRecurringListProps) => (find?: string, findBy?: string) => {
    const { isLoading, request } = props.webJobRecurringState.all;
    const { loadAllRequest } = props.webJobRecurringDispatch;
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
  handleOnBind: (props: WebJobRecurringListProps) => (item: IWebJobRecurring, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.description,
    quaternary: '',
    quinary: item.cron.expression,
    senary: props.intl.formatMessage(item.isAutoStart ? webJobMessage.recurring.field.isAutoStart : webJobMessage.recurring.field.isManualStart)
  }),
  handleOnSubmit: (props: WebJobRecurringListProps) => (values: IRecurringTriggerFormValue, actions: FormikActions<IRecurringTriggerFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // fill payload
      const payload: IWebJobRecurringTriggerPayload = {
        jobUid: values.jobUid
      };

     // set the promise
      promise = new Promise((resolve, reject) => {
        props.webJobRecurringDispatch.triggerRequest({
          resolve,
          reject,
          data: payload
        });
      });  
    }

    // handling promise
    promise
      .then((response: boolean) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(webJobMessage.shared.message.triggerSuccess, {state: 'Recurring', type: 'ID', uid: values.jobUid })
        });

        const { isLoading } = props.webJobMonitoringState.statisticAll;

        if (user && !isLoading) {
          props.webJobMonitoringDispatch.loadAllStatisticRequest({});
        }
        // redirect to detail
        // props.history.push(`/webjob/recurrings/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);

        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }
        
        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(webJobMessage.shared.message.triggerFailure)
        });
      });
  }
};

export const WebJobRecurringList = compose<WebJobRecurringListProps, IOwnOption>(
  setDisplayName('WebJobRecurringList'),
  withUser,
  withRouter,
  withMasterPage,
  withWebJobMonitoring,
  withWebJobRecurring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(WebJobRecurringListView);