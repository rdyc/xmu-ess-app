import { IEmployeePostPayload, IEmployeePutPayload } from '@account/classes/request';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
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
import { AccountEmployeeEditorView } from './AccountEmployeeEditorView';
import { AccountEmployeeFormData } from './form/AccountEmployeeContainerForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode;
  employeeUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeEditorProps
  = WithAccountEmployee
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeEditorProps) => (formData: AccountEmployeeFormData) => { 
    const errors = {
      information: {},
      bank: {},
      contact: {}
    };
  
    const requiredFields = [
      'employmentNumber', 'fullName', 'genderType', 'birthPlace', 'dateOfBirth', 
      'companyUid', 'employmentType', 'joinDate', 'taxType', 'religionType'
    ];
  
    const requiredBank = [
      'citizenNumber', 'taxNumber', 'familyCardNumber', 
      'bankAccount', 'bankAccountName'
    ];

    const requiredContact = [
      'address', 'addressAdditional', 'email',
      'emailPersonal', 'phone', 'mobilePhone'
    ];

    requiredFields.forEach(field => {
      if ( !formData.information[field] || isNullOrUndefined(formData.information[field]) ) {
        errors.information[field] = props.intl.formatMessage(accountMessage.employee.fieldFor(field, 'fieldRequired'));
      }
    });
    
    requiredBank.forEach(field => {
      if ( !formData.bank[field] || isNullOrUndefined(formData.bank[field]) ) {
        errors.bank[field] = props.intl.formatMessage(accountMessage.employee.fieldFor(field, 'fieldRequired'));
      }
    });

    requiredContact.forEach(field => {
      if ( !formData.contact[field] || isNullOrUndefined(formData.contact[field]) ) {
        errors.contact[field] = props.intl.formatMessage(accountMessage.employee.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: AccountEmployeeEditorProps) => (formData: AccountEmployeeFormData) => { 
    const { formMode, employeeUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
      ...formData.bank,
      ...formData.contact,
      image: null
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          data: payload as IEmployeePostPayload
        });
      });
    }

    // update checking
    if (!employeeUid) {
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          data: payload as IEmployeePutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeEditorProps) => (response: IEmployee) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Employee' });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Employee' });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/account/employee/${response.uid}`);
  },
  handleSubmitFail: (props: AccountEmployeeEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(accountMessage.shared.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.shared.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<AccountEmployeeEditorProps, OwnState> = (props: AccountEmployeeEditorProps): OwnState => ({ 
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(accountMessage.employee.confirm.createTitle),
  submitDialogContentText: props.intl.formatMessage(accountMessage.employee.confirm.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: accountMessage.shared.page.newTitle,
      subTitle: accountMessage.shared.page.newSubHeader,
    };

    if (!user) {
      return;
    }
    
    if (!isNullOrUndefined(history.location.state)) {
      view.title = accountMessage.shared.page.modifyTitle;
      view.subTitle = accountMessage.shared.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        employeeUid: history.location.state.uid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.employee.confirm.modifyTitle),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.employee.confirm.modifyDescription)
      });

      loadDetailRequest({
        employeeUid: history.location.state.uid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: '/account/employee',
      title: intl.formatMessage(view.title, { state: 'Employee' }),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage, accountEmployeeDispatch } = this.props;

    masterPage.resetPage();

    accountEmployeeDispatch.createDispose();
    accountEmployeeDispatch.updateDispose();
  }
};

export const AccountEmployeeEditor = compose<AccountEmployeeEditorProps, {}>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withAccountEmployee,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeEditorProps, {}>(lifecycles),
)(AccountEmployeeEditorView);