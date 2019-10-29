import AppMenu from '@constants/AppMenu';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { IWebJobDefinitionPostPayload } from '@webjob/classes/request';
import { IWebJobDefinition } from '@webjob/classes/response';
import { WithWebJobDefinition, withWebJobDefinition } from '@webjob/hoc/withWebJobDefinition';
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
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';

import { WebJobDefinitionFormView as WebJobDefinitionFormView } from './WebJobDefinitionFormView';

export interface IWebJobDefinitoinFormValue {
  file: FileList | null;
  fileName: string;
  fileType: string;
  fileSize: string;
}

interface IOwnOption {
}

interface IOwnState {
  initialValues?: IWebJobDefinitoinFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IWebJobDefinitoinFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnSubmit: (values: IWebJobDefinitoinFormValue, actions: FormikActions<IWebJobDefinitoinFormValue>) => void;
}

export type WebJobDefinitionFormProps
  = WithWebJobDefinition
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<WebJobDefinitionFormProps, IOwnState> = (props: WebJobDefinitionFormProps): IOwnState => ({
  // form values
  initialValues: {
    file: null,
    fileName: '',
    fileSize: '',
    fileType: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IWebJobDefinitoinFormValue>>({
    file: Yup.mixed()
      .label(props.intl.formatMessage(webJobMessage.definition.field.package))
      .required(),
  })
});

const stateUpdaters: StateUpdaters<WebJobDefinitionFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<WebJobDefinitionFormProps, IOwnHandler> = {
  handleOnSubmit: (props: WebJobDefinitionFormProps) => (values: IWebJobDefinitoinFormValue, actions: FormikActions<IWebJobDefinitoinFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user && values.file) {
      // fill payload
      const payload: IWebJobDefinitionPostPayload = {
        package: values.file
      };

      // set the promise
      promise = new Promise((resolve, reject) => {
        props.webJobDefinitionDispatch.createRequest({
          resolve,
          reject,
          data: payload
        });
      });
    }

    // handling promise
    promise
      .then((response: IWebJobDefinition) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(webJobMessage.shared.message.uploadSuccess, { state: 'Definition' })
        });

        // redirect to detail
        props.history.push(`/webjob/definitions`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        console.log('Error');

        // error on form fields
        // if (error.errors) {
          // error.errors.forEach(item => 
          //   actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          // );
        // }

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(webJobMessage.shared.message.uploadFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<WebJobDefinitionFormProps, IOwnState> = {
  componentDidMount() {
    // configure view
    this.props.masterPage.changePage({
      uid: AppMenu.WebJob,
      parentUid: AppMenu.Home,
      parentUrl: '/webjob/definitions',
      title: this.props.intl.formatMessage(webJobMessage.shared.page.createTitle, {state: 'Definition'}),
    });
  },
};

export const WebJobDefinitionForm = compose<WebJobDefinitionFormProps, IOwnOption>(
  setDisplayName('WebJobDefinitionForm'),
  withUser,
  withMasterPage,
  withRouter,
  withWebJobDefinition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(WebJobDefinitionFormView);