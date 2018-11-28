import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IMileageExceptionPostPayload } from '@lookup/classes/request/mileageException/IMileageExceptionPostPayload';
import { IMileageException } from '@lookup/classes/response';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
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
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type MileageExceptionEditorProps
  = WithLookupMileageException
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
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
          data: payload as IMileageExceptionPostPayload, 
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

    history.push('/lookup/mileageexception');
  },
  handleSubmitFail: (props: MileageExceptionEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(lookupMessage.mileageException.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.mileageException.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<MileageExceptionEditorProps, OwnState> = (props: MileageExceptionEditorProps): OwnState => ({ 
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<MileageExceptionEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.mileageExceptionDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.mileageException.page.newTitle,
      subTitle: lookupMessage.mileageException.page.newSubHeader,
    };

    if (!user) {
      return;
    }
    
    if (!isNullOrUndefined(history.location.state)) {
      view.title = lookupMessage.mileageException.page.modifyTitle;
      view.subTitle = lookupMessage.mileageException.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        mileageExceptionUid: history.location.state.uid
      });

      loadDetailRequest({
        mileageExceptionUid: history.location.state.uid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.LookupMileageException,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(view.title),
      subTitle : intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, mileageExceptionDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    mileageExceptionDispatch.createDispose();
    mileageExceptionDispatch.updateDispose();
  }
};

export default compose<MileageExceptionEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLookupMileageException,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MileageExceptionEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<MileageExceptionEditorProps, {}>(lifecycles),
)(MileageExceptionEditorView);