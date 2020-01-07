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

import { INotifSettingPostPayload, INotifSettingPutPayload } from '@hr.notification/classes/request/setting';
import { WithNotifSetting, withNotifSetting } from '@hr.notification/hoc/withNotifSetting';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { NotifSettingFormView } from './NotifSettingFormView';

export interface INotifSettingFormValue {
  uid: string;
  class: string;
  companyUid: string;
  templateUid: string;
  subject: string;
  to: string[];
  cc: string[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  initialValues: INotifSettingFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<INotifSettingFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: INotifSettingFormValue, actions: FormikActions<INotifSettingFormValue>) => void;
}

export type NotifSettingFormProps
  = WithNotifSetting
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

const createProps: mapper<NotifSettingFormProps, IOwnState> = (props: NotifSettingFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    class: '',
    companyUid: '',
    templateUid: '',
    subject: '',
    to: [],
    cc: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<INotifSettingFormValue>>({
    class: Yup.string()
      .label(props.intl.formatMessage(notifMessage.setting.field.class))
      .required(props.intl.formatMessage(notifMessage.setting.field.classRequired)),

    companyUid: Yup.string()
      .label(props.intl.formatMessage(notifMessage.setting.field.companyUid))      
      .required(props.intl.formatMessage(notifMessage.setting.field.companyUidRequired)),

    templateUid: Yup.string()
      .label(props.intl.formatMessage(notifMessage.setting.field.templateUid))      
      .required(props.intl.formatMessage(notifMessage.setting.field.templateUidRequired)),

    subject: Yup.string()
      .label(props.intl.formatMessage(notifMessage.setting.field.subject))      
      .max(150)
      .required(props.intl.formatMessage(notifMessage.setting.field.subjectRequired)),
      
    to: Yup.array()
      .of(
        Yup.string()
          .label(props.intl.formatMessage(notifMessage.setting.field.to))
          .email()
          .required(props.intl.formatMessage(notifMessage.setting.field.toRequired))
      ),
    
    cc: Yup.array()
      .of(
        Yup.string()
          .label(props.intl.formatMessage(notifMessage.setting.field.cc))
          .email()
          .required(props.intl.formatMessage(notifMessage.setting.field.ccRequired))
      )
  })

});

const stateUpdaters: StateUpdaters<NotifSettingFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<NotifSettingFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: NotifSettingFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const settingUid = props.history.location.state.uid;
      const { isLoading } = props.notifSettingState.detail;

      if (user && settingUid && !isLoading) {
        props.notifSettingDispatch.loadDetailRequest({
          settingUid
        });
      }
    }
  },
  handleOnSubmit: (props: NotifSettingFormProps) => (values: INotifSettingFormValue, actions: FormikActions<INotifSettingFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: INotifSettingPostPayload = {
          class: values.class,
          companyUid: values.companyUid,
          templateUid: values.templateUid,
          subject: values.subject,
          to: values.to,
          cc: values.cc
        };
        
        // set the promise
        promise = new Promise((resolve, reject) => {
          props.notifSettingDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // editing
      if (props.formMode === FormMode.Edit) {
        const settingUid = props.history.location.state.uid;

        // must have settingUid
        if (settingUid) {

          // fill payload
          const payload: INotifSettingPutPayload = {
            class: values.class,
            companyUid: values.companyUid,
            templateUid: values.templateUid,
            subject: values.subject,
            to: values.to,
            cc: values.cc
          };

          promise = new Promise((resolve, reject) => {
            props.notifSettingDispatch.updateRequest({
              settingUid, 
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.setting.message.createSuccess : notifMessage.setting.message.updateSuccess, { uid: response.uid })
        });
       
        // redirect to detail
        props.history.push(`/hr/notification/settings/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.setting.message.createFailure : notifMessage.setting.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<NotifSettingFormProps, IOwnState> = {
  componentDidUpdate(prevProps: NotifSettingFormProps) {
    // handle setting detail response
    const { response } = this.props.notifSettingState.detail;

    if (response !== prevProps.notifSettingState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: INotifSettingFormValue = {
          uid: response.data.uid,
          class: response.data.class,
          companyUid: response.data.companyUid,
          templateUid: response.data.templateUid,
          subject: response.data.subject,
          to: response.data.to,
          cc: response.data.cc
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const NotifSettingForm = compose<NotifSettingFormProps, IOwnOption>(
  setDisplayName('NotifSettingForm'),
  withOidc,
  withUser,
  withRouter,
  withNotifSetting,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(NotifSettingFormView);