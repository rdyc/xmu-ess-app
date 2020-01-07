import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobRecurringTriggerPayload } from '@webjob/classes/request';
import { WithWebJobMonitoring, withWebJobMonitoring } from '@webjob/hoc/withWebJobMonitoring';
import { WithWebJobRecurring, withWebJobRecurring } from '@webjob/hoc/withWebJobRecurring';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';

import { RecurringTriggerFormView } from './RecurringTriggerFormView';

export interface IRecurringTriggerFormValue {
  jobUid: string;
}

interface IOwnOption {
  isOpen: boolean;
  jobUid?: string;
  handleTriggerVisibility: (value: boolean) => {};
}

interface IOwnState {
  initialValues?: IRecurringTriggerFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IRecurringTriggerFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadStatistic: () => void;
  handleOnSubmit: (values: IRecurringTriggerFormValue, actions: FormikActions<IRecurringTriggerFormValue>) => void;
}

export type RecurringTriggerFormProps
  = WithWebJobRecurring
  & WithWebJobMonitoring
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<RecurringTriggerFormProps, IOwnState> = (props: RecurringTriggerFormProps): IOwnState => ({
  // form values
  initialValues: {
    jobUid: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IRecurringTriggerFormValue>>({
    jobUid: Yup.mixed()
      .label(props.intl.formatMessage(webJobMessage.recurring.field.job))
      .required()
  })
});

const stateUpdaters: StateUpdaters<RecurringTriggerFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<RecurringTriggerFormProps, IOwnHandler> = {
  handleOnLoadStatistic: (props: RecurringTriggerFormProps) => () => { 
    const { user } = props.userState;
    const { isLoading } = props.webJobMonitoringState.statisticAll;

    if (user && !isLoading) {
      props.webJobMonitoringDispatch.loadAllStatisticRequest({});
    }
  },
  handleOnSubmit: (props: RecurringTriggerFormProps) => (values: IRecurringTriggerFormValue, actions: FormikActions<IRecurringTriggerFormValue>) => {
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
      .then(() => {
        
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

        props.handleTriggerVisibility(false);
        // redirect to detail
        // props.history.push(`/webjob/recurrings/${response.uid}`);
      })
      .catch((error: any) => {
        let err: IValidationErrorResponse | undefined = undefined;
        
        if (error.id) {
          err = error;
        }
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => 
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

const lifeCycleFunctions: ReactLifeCycleFunctions<RecurringTriggerFormProps, IOwnState> = {
  componentDidUpdate(prevProps: RecurringTriggerFormProps) {
    const { jobUid: thisJobUid } = this.props;
    const { jobUid: prevJobUid } = prevProps;

    if (thisJobUid !== prevJobUid) {
      if (thisJobUid) {
        const initialValues: IRecurringTriggerFormValue = {
          jobUid: thisJobUid
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const RecurringTriggerForm = compose<RecurringTriggerFormProps, IOwnOption>(
  setDisplayName('RecurringTriggerForm'),
  withUser,
  withMasterPage,
  withRouter,
  withWebJobRecurring,
  withWebJobMonitoring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(RecurringTriggerFormView);