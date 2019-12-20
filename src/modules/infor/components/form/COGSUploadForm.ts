import AppMenu from '@constants/AppMenu';
import { IInforPostPayload } from '@infor/classes/request';
import { IInforResult } from '@infor/classes/response';
import { WithInfor, withInfor } from '@infor/hoc/withInfor';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { WithStyles, withStyles } from '@material-ui/core';
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
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';
import { COGSUploadFormView as COGSUploadFormView } from './COGSUploadFormView';

export interface ICOGSFormValue {
  file: FileList | null;
  fileName: string;
  fileType: string;
  fileSize: string;
}

interface IOwnOption {
}

interface IOwnState {
  initialValues?: ICOGSFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICOGSFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnSubmit: (values: ICOGSFormValue, actions: FormikActions<ICOGSFormValue>) => void;
}

export type COGSFormProps
  = WithInfor
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<COGSFormProps, IOwnState> = (props: COGSFormProps): IOwnState => ({
  // form values
  initialValues: {
    file: null,
    fileName: '',
    fileSize: '',
    fileType: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICOGSFormValue>>({
    file: Yup.mixed()
      .label(props.intl.formatMessage(lookupMessage.cogsUpload.field.file))
      .required(),
  })
});

const stateUpdaters: StateUpdaters<COGSFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<COGSFormProps, IOwnHandler> = {
  handleOnSubmit: (props: COGSFormProps) => (values: ICOGSFormValue, actions: FormikActions<ICOGSFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user && values.file) {
      // fill payload
      const payload: IInforPostPayload = {
        file: values.file
      };

      // set the promise
      promise = new Promise((resolve, reject) => {
        props.inforDispatch.postRequest({
          resolve,
          reject,
          data: payload
        });
      });
    }

    // handling promise
    promise
      .then((response: IInforResult) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(lookupMessage.cogsUpload.message.uploadSuccess, { approved: response.rowApproved,  rejected: response.rowRejected})
        });

        // redirect to detail
        props.history.push(`/lookup/cogsupload`);
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

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(lookupMessage.cogsUpload.message.uploadFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<COGSFormProps, IOwnState> = {
  componentDidMount() {
    // configure view
    this.props.masterPage.changePage({
      uid: AppMenu.COGSUpload,
      parentUid: AppMenu.Lookup,
      title: this.props.intl.formatMessage(lookupMessage.cogsUpload.page.uploadTitle),
      description: this.props.intl.formatMessage(lookupMessage.cogsUpload.page.uploadSubHeader)
    });
  },
};

export const COGSUploadForm = compose<COGSFormProps, IOwnOption>(
  setDisplayName('COGSUploadForm'),
  withUser,
  withMasterPage,
  withRouter,
  withInfor,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(COGSUploadFormView);