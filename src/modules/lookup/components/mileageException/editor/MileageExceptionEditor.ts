import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageExceptionPostPayload } from '@lookup/classes/request/mileageException/IMileageExceptionPostPayload';
import { IMileageExceptionPutPayload } from '@lookup/classes/request/mileageException/IMileageExceptionPutPayload';
import { IMileageException } from '@lookup/classes/response';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
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
import { MileageExceptionFormData } from './forms/MileageExceptionContainerForm';
import { MileageExceptionEditorView } from './MileageExceptionEditorView';

interface OwnHandlers {
  handleValidate: (payload: MileageExceptionFormData) => FormErrors;
  handleSubmit: (payload: MileageExceptionFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  mileageExceptionUid: string;
}

interface OwnState {
  formMode: FormMode;
  mileageExceptionUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type MileageExceptionEditorProps
  = WithLookupMileageException
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<MileageExceptionEditorProps, OwnHandlers> = {
  handleValidate: (props: MileageExceptionEditorProps) => (formData: MileageExceptionFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'roleUid', 'percentage'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: MileageExceptionEditorProps) => (formData: MileageExceptionFormData) => { 
    const { formMode, mileageExceptionUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.mileageExceptionDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          data: payload as IMileageExceptionPostPayload
        });
      });
    }

    // update checking
    if (!mileageExceptionUid) {
      const message = intl.formatMessage(lookupMessage.mileageException.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          mileageExceptionUid, 
          resolve, 
          reject,
          data: payload as IMileageExceptionPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: MileageExceptionEditorProps) => (response: IMileageException) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.mileageException.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(lookupMessage.mileageException.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/mileageexceptions/${response.uid}`);
  },
  handleSubmitFail: (props: MileageExceptionEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (formMode === FormMode.New) {
        message = intl.formatMessage(lookupMessage.mileageException.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.mileageException.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<MileageExceptionEditorProps, OwnState> = (props: MileageExceptionEditorProps): OwnState => ({ 
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.createTitle),
  submitDialogContentText: props.intl.formatMessage(lookupMessage.shared.confirm.createDescription, { state: 'Mileage Exception'}),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<MileageExceptionEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.mileageExceptionDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.mileageException.page.newTitle,
      subTitle: lookupMessage.mileageException.page.newSubHeader,
    };

    if (!user) {
      return;
    }
    
    if (!(history.location.state === undefined || history.location.state === null)) {
      view.title = lookupMessage.mileageException.page.modifyTitle;
      view.subTitle = lookupMessage.mileageException.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        mileageExceptionUid: history.location.state.uid,
        submitDialogTitle: this.props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        submitDialogContentText : this.props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Mileage Exception'})
      });

      loadDetailRequest({
        mileageExceptionUid: history.location.state.uid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupMileageException,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/mileageexceptions',
      title: intl.formatMessage(view.title),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage, mileageExceptionDispatch } = this.props;

    masterPage.resetPage();

    mileageExceptionDispatch.createDispose();
    mileageExceptionDispatch.updateDispose();
  }
};

export default compose<MileageExceptionEditorProps, {}>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withLookupMileageException,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MileageExceptionEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<MileageExceptionEditorProps, {}>(lifecycles),
)(MileageExceptionEditorView);