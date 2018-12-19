import { IEmployeePostPayload, IEmployeePutPayload } from '@account/classes/request';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
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
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeEditorProps) => (formData: AccountEmployeeFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'employmentNumber', 'fullName', 'genderType', 'birthPlace', 'dateOfBirth', 'companyUid',
      'employmentType', 'joinDate', 'taxType', 'citizenNumber', 'taxNumber', 'familyCardNumber', 
      'bankAccount', 'bankAccountName', 'address', 'addressAdditional', 'email',
      'emailPersonal', 'phone'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(accountMessage.employee.fieldFor(field, 'fieldRequired'));
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
      ...formData.contact
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
      const message = intl.formatMessage(accountMessage.employee.message.emptyProps);

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
      message = intl.formatMessage(accountMessage.employee.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.employee.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/lookup/employee/${response.uid}`);
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
        message = intl.formatMessage(accountMessage.employee.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.employee.message.updateFailure);
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
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: accountMessage.employee.page.newTitle,
      subTitle: accountMessage.employee.page.newSubHeader,
    };

    if (!user) {
      return;
    }
    
    if (!isNullOrUndefined(history.location.state)) {
      view.title = accountMessage.employee.page.modifyTitle;
      view.subTitle = accountMessage.employee.page.modifySubHeader;

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

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.Account,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(view.title),
        subTitle : intl.formatMessage(view.subTitle)
      },
      parentUrl: `/lookup/employee`,
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
    const { layoutDispatch, appBarDispatch, accountEmployeeDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    accountEmployeeDispatch.createDispose();
    accountEmployeeDispatch.updateDispose();
  }
};

export default compose<AccountEmployeeEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withAccountEmployee,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeEditorProps, {}>(lifecycles),
)(AccountEmployeeEditorView);