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

import { INotifTemplatePostPayload, INotifTemplatePutPayload } from '@hr.notification/classes/request/template';
import { WithNotifTemplate, withNotifTemplate } from '@hr.notification/hoc/withNotifTemplate';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { NotifTemplateFormView } from './NotifTemplateFormView';

export interface INotifTemplateFormValue {
  uid: string;
  name: string;
  content: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  initialValues: INotifTemplateFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<INotifTemplateFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: INotifTemplateFormValue, actions: FormikActions<INotifTemplateFormValue>) => void;
}

export type NotifTemplateFormProps
  = WithNotifTemplate
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

const createProps: mapper<NotifTemplateFormProps, IOwnState> = (props: NotifTemplateFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    name: '',
    content: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<INotifTemplateFormValue>>({
    name: Yup.string()
      .label(props.intl.formatMessage(notifMessage.template.field.name))      
      .max(150)
      .required(props.intl.formatMessage(notifMessage.template.field.nameRequired)),
    
      content: Yup.string()
      .label(props.intl.formatMessage(notifMessage.template.field.content))
      .required(props.intl.formatMessage(notifMessage.template.field.contentRequired))
  })

});

const stateUpdaters: StateUpdaters<NotifTemplateFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<NotifTemplateFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: NotifTemplateFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const templateUid = props.history.location.state.uid;
      const { isLoading } = props.notifTemplateState.detail;

      if (user && templateUid && !isLoading) {
        props.notifTemplateDispatch.loadDetailRequest({
          templateUid
        });
      }
    }
  },
  handleOnSubmit: (props: NotifTemplateFormProps) => (values: INotifTemplateFormValue, actions: FormikActions<INotifTemplateFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: INotifTemplatePostPayload = {
          name: values.name,
          content: values.content
        };
        
        // set the promise
        promise = new Promise((resolve, reject) => {
          props.notifTemplateDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // editing
      if (props.formMode === FormMode.Edit) {
        const templateUid = props.history.location.state.uid;

        // must have templateUid
        if (templateUid) {

          // fill payload
          const payload: INotifTemplatePutPayload = {
            name: values.name,
            content: values.content
          };

          promise = new Promise((resolve, reject) => {
            props.notifTemplateDispatch.updateRequest({
              templateUid, 
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.template.message.createSuccess : notifMessage.template.message.updateSuccess, { uid: response.uid })
        });
       
        // redirect to detail
        props.history.push(`/hr/notification/templates/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.template.message.createFailure : notifMessage.template.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<NotifTemplateFormProps, IOwnState> = {
  componentDidUpdate(prevProps: NotifTemplateFormProps) {
    // handle template detail response
    const { response } = this.props.notifTemplateState.detail;

    if (response !== prevProps.notifTemplateState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: INotifTemplateFormValue = {
          uid: response.data.uid,
          name: response.data.name,
          content: response.data.content
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const NotifTemplateForm = compose<NotifTemplateFormProps, IOwnOption>(
  setDisplayName('NotifTemplateForm'),
  withOidc,
  withUser,
  withRouter,
  withNotifTemplate,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(NotifTemplateFormView);