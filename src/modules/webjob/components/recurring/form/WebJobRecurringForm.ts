import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobRecurringPostPayload, IWebJobRecurringPutPayload } from '@webjob/classes/request';
import { IWebJobRecurring } from '@webjob/classes/response';
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
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';

import { WebJobRecurringFormView } from './WebJobRecurringFormView';

export interface IWebJobRecurringFormValue {
  uid: string;
  definitionUid: string;
  jobUid: string;
  name: string;
  description: string;
  cronExpression: string;
  isAutoStart: boolean;
}

interface IOwnOption {
}

interface IOwnRouteParams {
  recurringUid: string;
}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IWebJobRecurringFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IWebJobRecurringFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IWebJobRecurringFormValue, actions: FormikActions<IWebJobRecurringFormValue>) => void;
}

export type WebJobRecurringFormProps
  = WithWebJobRecurring
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<WebJobRecurringFormProps, IOwnState> = (props: WebJobRecurringFormProps): IOwnState => ({
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    definitionUid: '',
    jobUid: '',
    name: '',
    description: '',
    cronExpression: '',
    isAutoStart: false
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IWebJobRecurringFormValue>>({
    definitionUid: Yup.mixed()
      .label(props.intl.formatMessage(webJobMessage.recurring.field.definition)),
    jobUid: Yup.mixed()
      .label(props.intl.formatMessage(webJobMessage.recurring.field.job))
      .required(),
    name: Yup.mixed()
      .label(props.intl.formatMessage(webJobMessage.recurring.field.name))
      .required(),
    description: Yup.mixed()
      .label(props.intl.formatMessage(webJobMessage.recurring.field.description))
      .required(),
    cronExpression: Yup.mixed()
      .label(props.intl.formatMessage(webJobMessage.recurring.field.expression))
      .required(),
  })
});

const stateUpdaters: StateUpdaters<WebJobRecurringFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<WebJobRecurringFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: WebJobRecurringFormProps) => () => { 
    if (!isNullOrUndefined(props.history.location.state)) {
      const { user } = props.userState;
      const recurringUid = props.history.location.state.uid;
      const { isLoading } = props.webJobRecurringState.detail;
  
      if (user && recurringUid && !isLoading) {
        props.webJobRecurringDispatch.loadDetailRequest({
          recurringUid
        });
      }
    }
  },
  handleOnSubmit: (props: WebJobRecurringFormProps) => (values: IWebJobRecurringFormValue, actions: FormikActions<IWebJobRecurringFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IWebJobRecurringPostPayload = {
          jobUid: values.jobUid,
          name: values.name,
          description: values.description,
          cronExpression: values.cronExpression,
          isAutoStart: values.isAutoStart
        };

       // set the promise
        promise = new Promise((resolve, reject) => {
          props.webJobRecurringDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }   
      // Edit
      if (props.formMode === FormMode.Edit) {
        const recurringUid = props.history.location.state.uid;

        // must have recurringUid
        if (recurringUid) {
          const payload: IWebJobRecurringPutPayload = {
            jobUid: values.jobUid,
            name: values.name,
            description: values.description,
            cronExpression: values.cronExpression,
            isAutoStart: values.isAutoStart
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.webJobRecurringDispatch.updateRequest({
              resolve,
              reject,
              recurringUid,
              data: payload
            });
          });
        }
      }  
    }

    // handling promise
    promise
      .then((response: IWebJobRecurring) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? webJobMessage.shared.message.createSuccess : webJobMessage.shared.message.updateSuccess, {state: 'Recurring', type: 'name', uid: response.name })
        });

        // redirect to detail
        props.history.push(`/webjob/recurrings/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? webJobMessage.shared.message.createFailure : webJobMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<WebJobRecurringFormProps, IOwnState> = {
  componentDidUpdate(prevProps: WebJobRecurringFormProps) {
    const { response: thisResponse } = this.props.webJobRecurringState.detail;
    const { response: prevResponse } = prevProps.webJobRecurringState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IWebJobRecurringFormValue = {
          uid: thisResponse.data.uid,
          name: thisResponse.data.name,
          description: thisResponse.data.description,
          definitionUid: '',
          jobUid: thisResponse.data.jobUid,
          cronExpression: thisResponse.data.cron.expression,
          isAutoStart: thisResponse.data.isAutoStart
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const WebJobRecurringForm = compose<WebJobRecurringFormProps, IOwnOption>(
  setDisplayName('WebJobRecurringForm'),
  withUser,
  withMasterPage,
  withRouter,
  withWebJobRecurring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(WebJobRecurringFormView);