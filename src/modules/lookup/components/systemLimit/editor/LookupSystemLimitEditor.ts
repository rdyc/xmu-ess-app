import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ISystemLimitPostPayload, ISystemLimitPutPayload } from '@lookup/classes/request';
import { ISystemLimit } from '@lookup/classes/response';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
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
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type SystemLimitEditorProps
  = WithLookupSystemLimit
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
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
      if (!formData.information[field] || (formData.information[field] === undefined || formData.information[field] === null)) {
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
          limitUid: systemLimitUid,
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
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
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
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<SystemLimitEditorProps, OwnState> = (props: SystemLimitEditorProps): OwnState => ({ 
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.createTitle),
  submitDialogContentText: props.intl.formatMessage(lookupMessage.shared.confirm.createDescription, { state: 'Time Limit'}),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<SystemLimitEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.systemLimitDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: lookupMessage.systemLimit.page.newTitle,
      subTitle: lookupMessage.systemLimit.page.newSubHeader,
    };

    if (!user) {
      return;
    }
    
    if (!(history.location.state === undefined || history.location.state === null)) {
      view.title = lookupMessage.systemLimit.page.modifyTitle;
      view.subTitle = lookupMessage.systemLimit.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        systemLimitUid: history.location.state.uid,
        companyUid: history.location.state.companyUid,
        submitDialogTitle: this.props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        submitDialogContentText : this.props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Time Limit'})
      });

      loadDetailRequest({
        limitUid: history.location.state.uid,
        companyUid: history.location.state.companyUid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupSystemLimit,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/systemlimits',
      title: intl.formatMessage(view.title),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage, systemLimitDispatch } = this.props;

    masterPage.resetPage();

    systemLimitDispatch.createDispose();
    systemLimitDispatch.updateDispose();
  }
};

export default compose<SystemLimitEditorProps, {}>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withLookupSystemLimit,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SystemLimitEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<SystemLimitEditorProps, {}>(lifecycles),
)(LookupSystemLimitEditorView);