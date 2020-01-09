import { IEmployeeFamilyPostPayload, IEmployeeFamilyPutPayload } from '@account/classes/request/employeeFamily';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
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
import { AccountEmployeeFamilyEditorView } from './AccountEmployeeFamilyEditorView';
import { AccountEmployeeFamilyFormData } from './form/AccountEmployeeFamilyContainerForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeFamilyFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeFamilyFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {

}

interface OwnRouteParams {
  employeeUid: string;
  familyUid: string;  
}

interface OwnState {
  formMode: FormMode;
  employeeUid: string;
  familyUid?: string | undefined;  
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeFamilyEditorProps
  = WithAccountEmployeeFamily
  & WithUser
  & WithLayout
  & WithMasterPage
  & WithWidth
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & OwnOption
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeFamilyEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeFamilyEditorProps) => (formData: AccountEmployeeFamilyFormData) => {
    const errors = {
      family: {}
    };

    const requiredFields = [
      'familyType', 'fullName', 'genderType', 'birthPlace'
    ];

    requiredFields.forEach(field => {
      if (!formData.family[field] || (formData.family[field] === undefined || formData.family[field] === null)) {
        errors.family[field] = props.intl.formatMessage(accountMessage.family.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: AccountEmployeeFamilyEditorProps) => (formData: AccountEmployeeFamilyFormData) => {
    const { formMode, employeeUid, intl, familyUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeFamilyDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.family,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          employeeUid,
          data: payload as IEmployeeFamilyPostPayload
        });
      });
    }

    // update checking
    if (!familyUid) {
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve,
          reject,
          employeeUid,
          data: payload as IEmployeeFamilyPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeFamilyEditorProps) => (response: IEmployee) => {
    const { formMode, intl, history, employeeUid, } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Employee Family' });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Employee Family', uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/account/employee/${employeeUid}/family/${response.uid}`);
  },
  handleSubmitFail: (props: AccountEmployeeFamilyEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

const createProps: mapper<AccountEmployeeFamilyEditorProps, OwnState> = (props: AccountEmployeeFamilyEditorProps): OwnState => ({ 
  employeeUid: props.match.params.employeeUid,
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.createTitle, {state: 'Family'}),
  submitDialogContentText: props.intl.formatMessage(accountMessage.shared.confirm.createDescription, {state: 'family'}),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFamilyEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate, match } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeFamilyDispatch;
    const { user } = this.props.userState;

    const view = {
      title: accountMessage.shared.page.newTitle,
      subTitle: accountMessage.shared.page.newSubHeader
    };

    if (!user) {
      return;
    }

    if (history.location.state !== null || history.location.state !== undefined) {
      view.title = accountMessage.shared.page.modifyTitle;
      view.subTitle = accountMessage.shared.page.modifySubHeader;

      stateUpdate({
        formMode: FormMode.Edit,
        employeeUid: match.params.employeeUid,
        familyUid: history.location.state.familyUid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, { state: 'Family'}),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, { state: 'family'})
      });

      loadDetailRequest({
        employeeUid: match.params.employeeUid,
        familyUid: history.location.state.familyUid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: `/account/employee/${match.params.employeeUid}/family`,
      title: intl.formatMessage(view.title, {state: 'Family'}),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage, accountEmployeeFamilyDispatch } = this.props;

    masterPage.resetPage();

    accountEmployeeFamilyDispatch.createDispose();
    accountEmployeeFamilyDispatch.updateDispose();
  }
};

export const AccountEmployeeFamilyEditor = compose<AccountEmployeeFamilyEditorProps, OwnOption>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withWidth(),
  withAccountEmployeeFamily,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeFamilyEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeFamilyEditorProps, {}>(lifecycles),
)(AccountEmployeeFamilyEditorView);