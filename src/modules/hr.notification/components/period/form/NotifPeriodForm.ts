import { FormMode } from '@generic/types/FormMode';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProject } from '@project/classes/response';
import styles from '@styles';
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

import { INotifPeriodPostPayload, INotifPeriodPutPayload } from '@hr.notification/classes/request/period';
import { WithNotifPeriod, withNotifPeriod } from '@hr.notification/hoc/withNotifPeriod';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { ISelectFieldOption } from '@layout/components/fields/SelectField';
import { NotifPeriodFormView } from './NotifPeriodFormView';

export interface INotifPeriodFormValue {
  uid: string;
  type: string;
  name: string;
  from: number;
  to: number;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  periodOptions: ISelectFieldOption[];

  initialValues: INotifPeriodFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<INotifPeriodFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: INotifPeriodFormValue, actions: FormikActions<INotifPeriodFormValue>) => void;
}

export type NotifPeriodFormProps
  = WithNotifPeriod
  & WithOidc
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<NotifPeriodFormProps, IOwnState> = (props: NotifPeriodFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  periodOptions: [
    { label: 'Birthday', value: 'birthday'},
    { label: 'Contract', value: 'contract'},
  ],

  // form values
  initialValues: {
    uid: 'Auto Generated',
    name: '',
    type: '',
    from: 0,
    to: 0
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<INotifPeriodFormValue>>({
    type: Yup.string()
      .label(props.intl.formatMessage(notifMessage.period.field.type))
      .required(),

    name: Yup.string()
      .label(props.intl.formatMessage(notifMessage.period.field.name))      
      .max(150)
      .required(),
      
    from: Yup.number()
      .label(props.intl.formatMessage(notifMessage.period.field.from))
      .min(0)
      .required(),

    to: Yup.number()
      .label(props.intl.formatMessage(notifMessage.period.field.to))      
      .min(0)
      .required()
  })

});

const stateUpdaters: StateUpdaters<NotifPeriodFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<NotifPeriodFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: NotifPeriodFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const periodUid = props.history.location.state.uid;
      const { isLoading } = props.notifPeriodState.detail;

      if (user && periodUid && !isLoading) {
        props.notifPeriodDispatch.loadDetailRequest({
          periodUid
        });
      }
    }
  },
  handleOnSubmit: (props: NotifPeriodFormProps) => (values: INotifPeriodFormValue, actions: FormikActions<INotifPeriodFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: INotifPeriodPostPayload = {
          type: values.type,
          name: values.name,
          from: values.from,
          to: values.to
        };
        
        // set the promise
        promise = new Promise((resolve, reject) => {
          props.notifPeriodDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // editing
      if (props.formMode === FormMode.Edit) {
        const periodUid = props.history.location.state.uid;

        // must have periodUid
        if (periodUid) {

          // fill payload
          const payload: INotifPeriodPutPayload = {
            type: values.type,
            name: values.name,
            from: values.from,
            to: values.to
          };

          promise = new Promise((resolve, reject) => {
            props.notifPeriodDispatch.updateRequest({
              periodUid, 
              resolve, 
              reject,
              data: payload, 
            });
          });

        }
      }
    }

    // handling promise
    promise
      .then((response: IProject) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.period.message.createSuccess : notifMessage.period.message.updateSuccess, { uid: response.uid })
        });
       
        // redirect to detail
        props.history.push(`/hr/notification/periods/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.period.message.createFailure : notifMessage.period.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<NotifPeriodFormProps, IOwnState> = {
  componentDidUpdate(prevProps: NotifPeriodFormProps) {
    // handle period detail response
    const { response } = this.props.notifPeriodState.detail;

    if (response !== prevProps.notifPeriodState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: INotifPeriodFormValue = {
          uid: response.data.uid,
          type: response.data.type,
          name: response.data.name,
          from: response.data.from,
          to: response.data.to
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const NotifPeriodForm = compose<NotifPeriodFormProps, IOwnOption>(
  setDisplayName('NotifPeriodForm'),
  withOidc,
  withUser,
  withRouter,
  withNotifPeriod,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(NotifPeriodFormView);