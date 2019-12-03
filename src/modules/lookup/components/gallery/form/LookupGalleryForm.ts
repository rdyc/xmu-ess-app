import AppMenu from '@constants/AppMenu';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { IGalleryPostPayload } from '@lookup/classes/request/gallery/IGalleryPostPayload';
import { withImageGallery, WithImageGallery } from '@lookup/hoc/withImageGallery';
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
import { LookupGalleryFormView as LookupGalleryFormView } from './LookupGalleryFormView';

export interface IGalleryFormValue {
  file: FileList | null;
  fileName: string;
  fileType: string;
  fileSize: string;
}

interface IOwnOption {
}

interface IOwnState {
  initialValues?: IGalleryFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IGalleryFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
}

interface IOwnHandler {
  handleOnSubmit: (values: IGalleryFormValue, actions: FormikActions<IGalleryFormValue>) => void;
}

export type GalleryFormProps
  = WithImageGallery
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<GalleryFormProps, IOwnState> = (props: GalleryFormProps): IOwnState => ({
  // form values
  initialValues: {
    file: null,
    fileName: '',
    fileSize: '',
    fileType: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IGalleryFormValue>>({
    file: Yup.mixed()
      .label(props.intl.formatMessage(lookupMessage.achievement.field.file))
      .required(),
  })
});

const stateUpdaters: StateUpdaters<GalleryFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<GalleryFormProps, IOwnHandler> = {
  handleOnSubmit: (props: GalleryFormProps) => (values: IGalleryFormValue, actions: FormikActions<IGalleryFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user && values.file) {
      // fill payload
      const payload: IGalleryPostPayload = {
        file: values.file
      };

      // set the promise
      promise = new Promise((resolve, reject) => {
        props.imageGalleryDispatch.createRequest({
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
          message: props.intl.formatMessage(lookupMessage.gallery.message.createSuccess)
        });

        // redirect to detail
        props.history.push(`/lookup/imagegalleries`);
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
          message: props.intl.formatMessage(lookupMessage.gallery.message.createFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<GalleryFormProps, IOwnState> = {
  componentDidMount() {
    // configure view
    this.props.masterPage.changePage({
      uid: AppMenu.ImageGallery,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/imagegalleries',
      title: this.props.intl.formatMessage(lookupMessage.gallery.page.newTitle),
      description: this.props.intl.formatMessage(lookupMessage.gallery.page.newSubHeader)
    });
  },
};

export const LookupGalleryForm = compose<GalleryFormProps, IOwnOption>(
  setDisplayName('LookupGalleryForm'),
  withUser,
  withMasterPage,
  withRouter,
  withImageGallery,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupGalleryFormView);