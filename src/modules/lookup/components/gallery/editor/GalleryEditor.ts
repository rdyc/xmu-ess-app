import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IGalleryPostPayload } from '@lookup/classes/request/gallery';
import { IGallery } from '@lookup/classes/response/gallery';
import { WithImageGallery, withImageGallery } from '@lookup/hoc/withImageGallery';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { GalleryFormData } from './form/GalleryContainerForm';
import { GalleryEditorView } from './GalleryEditorView';

interface OwnHandlers {
  handleValidate: (payload: GalleryFormData) => FormErrors;
  handleSubmit: (payload: GalleryFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  imageUid: string;
}

interface OwnState {
  formMode: FormMode;
  imageUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type GalleryEditorProps
  = WithImageGallery
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<GalleryEditorProps, OwnHandlers> = {
  handleValidate: (props: GalleryEditorProps) => (formData: GalleryFormData) => { 
    const errors = {
      files: {}
    };
  
    const requiredFields = [
      'file'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.files[field] || isNullOrUndefined(formData.files[field])) {
        errors.files[field] = props.intl.formatMessage(lookupMessage.gallery.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: GalleryEditorProps) => (formData: GalleryFormData) => { 
    const { formMode, imageUid, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.imageGalleryDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }
    const payload = {
      ...formData.files
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          data: payload as IGalleryPostPayload
        });
      });
    }

    // update checking
    if (!imageUid) {
      const message = intl.formatMessage(lookupMessage.gallery.message.emptyProps);

      return Promise.reject(message);
    }

    return null;
  },
  handleSubmitSuccess: (props: GalleryEditorProps) => (response: IGallery) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.gallery.message.createSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/gallery/${response.uid}`);
  },
  handleSubmitFail: (props: GalleryEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (formMode === FormMode.New) {
        message = intl.formatMessage(lookupMessage.gallery.message.createFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<GalleryEditorProps, OwnState> = (props: GalleryEditorProps): OwnState => ({ 
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.createTitle),
  submitDialogContentText: props.intl.formatMessage(lookupMessage.shared.confirm.createDescription, { state: 'Gallery Image'}),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<GalleryEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.imageGalleryDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.gallery.page.newTitle,
      subTitle: lookupMessage.gallery.page.newSubHeader,
    };

    if (!user) {
      return;
    }
    
    if (!isNullOrUndefined(history.location.state)) {
      view.title = lookupMessage.gallery.page.modifyTitle;
      view.subTitle = lookupMessage.gallery.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        imageUid: history.location.state.uid,
        submitDialogTitle: this.props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        submitDialogContentText : this.props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Gallery Image'})
      });

      loadDetailRequest({
        imageUid: history.location.state.uid
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.LookupGallery,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(view.title),
        subTitle : intl.formatMessage(view.subTitle)
      },
      parentUrl: `/lookup/gallery`,
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      }
    });
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, imageGalleryDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    imageGalleryDispatch.createDispose();
  }
};

export default compose<GalleryEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withImageGallery,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<GalleryEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<GalleryEditorProps, {}>(lifecycles),
)(GalleryEditorView);