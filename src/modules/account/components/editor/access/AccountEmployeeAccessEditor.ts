import { IEmployeeAccessPostPayload, IEmployeeAccessPutPayload } from '@account/classes/request/employeeAccess';
import { IEmployeeAccess } from '@account/classes/response/employeeAccess';
import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
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
import { AccountEmployeeAccessEditorView } from './AccountEmployeeAccessEditorView';
import { AccountEmployeeAccessContainerFormData } from './form/AccountEmployeeAccessContainerForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeAccessContainerFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeAccessContainerFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnProps {

}

interface OwnRouteParams {
  employeeUid: string;
  accessUid: string;  
}

interface OwnState {
  formMode: FormMode;
  employeeUid: string;
  accessUid?: string | undefined;  
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeAccessEditorProps
  = WithAccountEmployeeAccess
  & WithUser
  & WithLayout
  & WithWidth
  & WithMasterPage
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & OwnHandlers
  & OwnState
  & OwnProps
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeAccessEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeAccessEditorProps) => (formData: AccountEmployeeAccessContainerFormData) => { 
    const errors = {
      access: {}
    };
  
    const requiredFields = [
      'companyUid', 'positionUid', 'roleUid', 'levelType', 'start'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.access[field] || (formData.access[field] === undefined || formData.access[field] === null)) {
        errors.access[field] = props.intl.formatMessage(accountMessage.access.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AccountEmployeeAccessEditorProps) => (formData: AccountEmployeeAccessContainerFormData) => { 
    const { formMode, accessUid, intl, employeeUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeAccessDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.access
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          employeeUid,
          data: payload as IEmployeeAccessPostPayload
        });
      });
    }

    // update checking
    if (!accessUid) {
      const message = intl.formatMessage(accountMessage.access.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          employeeUid,
          data: payload as IEmployeeAccessPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeAccessEditorProps) => (response: IEmployeeAccess) => {
    const { formMode, intl, history, employeeUid, } = props;
    const { alertAdd } = props.layoutDispatch;
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Multi Company Access' });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Multi Company Access', uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/account/employee/${employeeUid}/access/${response.uid}`);
  },
  handleSubmitFail: (props: AccountEmployeeAccessEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(accountMessage.shared.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.shared.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<AccountEmployeeAccessEditorProps, OwnState> = (props: AccountEmployeeAccessEditorProps): OwnState => ({
  employeeUid: props.match.params.employeeUid,
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.createTitle, {state: 'Multi Company Access'}),
  submitDialogContentText: props.intl.formatMessage(accountMessage.shared.confirm.createDescription, {state: 'multi company access'}),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate, match } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeAccessDispatch;
    const { user } = this.props.userState;

    const view = {
      title: accountMessage.shared.page.newTitle,
      subTitle: accountMessage.shared.page.newSubHeader
    };

    if (!user) {
      return;
    }

    if (!(history.location.state === undefined || history.location.state === null)) {
      view.title = accountMessage.shared.page.modifyTitle;
      view.subTitle = accountMessage.shared.page.modifySubHeader;

      stateUpdate({
        formMode: FormMode.Edit,
        employeeUid: match.params.employeeUid,
        accessUid: history.location.state.accessUid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, { state: 'Multi Company Access'}),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, { state: 'multi company access'})
      });

      loadDetailRequest({
        employeeUid: match.params.employeeUid,
        accessUid: history.location.state.accessUid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: `/account/employee/${match.params.employeeUid}/access`,
      title: intl.formatMessage(view.title, {state: 'Multi Company Access'}),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage, accountEmployeeAccessDispatch } = this.props;

    masterPage.resetPage();

    accountEmployeeAccessDispatch.createDispose();
    accountEmployeeAccessDispatch.updateDispose();
  }
};

export const AccountEmployeeAccessEditor = compose<AccountEmployeeAccessEditorProps, OwnProps>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withWidth(),
  withAccountEmployeeAccess,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeAccessEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeAccessEditorProps, {}>(lifecycles),
)(AccountEmployeeAccessEditorView);