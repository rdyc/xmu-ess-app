import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ISystemLimitPostPayload, ISystemLimitPutPayload } from '@lookup/classes/request';
import { ISystemLimit } from '@lookup/classes/response';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
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
import { SystemLimitFormData } from './forms/LookupSystemLimitContainerForm';
import { LookupSystemLimitEditorView } from './LookupSystemLimitEditorView';

interface OwnHandlers {
  handleValidate: (payload: SystemLimitFormData) => FormErrors;
  handleSubmit: (payload: SystemLimitFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  systemLimitUid: string;
}

interface OwnState {
  formMode: FormMode;
  systemLimitUid?: string | undefined;
  companyUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type SystemLimitEditorProps
  = WithLookupSystemLimit
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<SystemLimitEditorProps, OwnHandlers> = {
  handleValidate: (props: SystemLimitEditorProps) => (formData: SystemLimitFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'categoryType', 'days'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(lookupMessage.systemLimit.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: SystemLimitEditorProps) => (formData: SystemLimitFormData) => { 
    const { formMode, systemLimitUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.systemLimitDispatch;

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
          companyUid: payload.companyUid ? payload.companyUid : '',
          data: payload as ISystemLimitPostPayload
        });
      });
    }

    // update checking
    if (!systemLimitUid) {
      const message = intl.formatMessage(lookupMessage.systemLimit.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          systemLimitUid,
          companyUid: payload.companyUid ? payload.companyUid : '',
          data: payload as ISystemLimitPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: SystemLimitEditorProps) => (response: ISystemLimit) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(lookupMessage.systemLimit.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(lookupMessage.systemLimit.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/systemlimits/${response.uid}`, { companyuid: response.companyUid });
  },
  handleSubmitFail: (props: SystemLimitEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(lookupMessage.systemLimit.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(lookupMessage.systemLimit.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<SystemLimitEditorProps, OwnState> = (props: SystemLimitEditorProps): OwnState => ({ 
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<SystemLimitEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.systemLimitDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.systemLimit.page.newTitle,
      subTitle: lookupMessage.systemLimit.page.newSubHeader,
    };

    if (!user) {
      return;
    }
    
    if (!isNullOrUndefined(history.location.state)) {
      view.title = lookupMessage.systemLimit.page.modifyTitle;
      view.subTitle = lookupMessage.systemLimit.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        systemLimitUid: history.location.state.uid,
        companyUid: history.location.state.companyUid
      });

      loadDetailRequest({
        systemLimitUid: history.location.state.uid,
        companyUid: history.location.state.companyUid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.LookupSystemLimit,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(view.title),
      subTitle : intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, systemLimitDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    systemLimitDispatch.createDispose();
    systemLimitDispatch.updateDispose();
  }
};

export default compose<SystemLimitEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SystemLimitEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<SystemLimitEditorProps, {}>(lifecycles),
)(LookupSystemLimitEditorView);