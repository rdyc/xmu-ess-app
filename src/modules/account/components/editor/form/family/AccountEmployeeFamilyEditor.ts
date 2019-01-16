import { IEmployeeFamilyPostPayload, IEmployeeFamilyPutPayload } from '@account/classes/request/employeeFamily';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
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
import { AccountEmployeeFamilyFormData } from './AccountEmployeeFamilyContainerForm';
import { AccountEmployeeFamilyEditorView } from './AccountEmployeeFamilyEditorView';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeFamilyFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeFamilyFormData) => void;
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

export type AccountEmployeeFamilyEditorProps
  = WithAccountEmployeeFamily
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeFamilyEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeFamilyEditorProps) => (formData: AccountEmployeeFamilyFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'familyType', 'fullName', 'genderType', 'birthPlace', 'birthDate'
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(accountMessage.employee.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: AccountEmployeeFamilyEditorProps) => (formData: AccountEmployeeFamilyFormData) => {
    const { formMode, employeeUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeFamilyDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          employeeUid: payload.employeeUid ? payload.employeeUid : '',
          data: payload as IEmployeeFamilyPostPayload
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
          employeeUid: payload.employeeUid ? payload.employeeUid : '',
          data: payload as IEmployeeFamilyPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeFamilyEditorProps) => (response: IEmployee) => {
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
  handleSubmitFail: (props: AccountEmployeeFamilyEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

const createProps: mapper<AccountEmployeeFamilyEditorProps, OwnState> = (props: AccountEmployeeFamilyEditorProps): OwnState => ({
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

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFamilyEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeFamilyDispatch;
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
        submitDialogContentText: this.props.intl.formatMessage(accountMessage.employee.confirm.modifyDescription)
      });

      loadDetailRequest({
        employeeUid: history.location.state.uid,
        familyUid: history.location.state.uid
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.Account,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(view.title),
        subTitle: intl.formatMessage(view.subTitle)
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
    const { layoutDispatch, appBarDispatch, accountEmployeeFamilyDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    accountEmployeeFamilyDispatch.createDispose();
    accountEmployeeFamilyDispatch.updateDispose();
  }
};

export default compose<AccountEmployeeFamilyEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withAccountEmployeeFamily,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeFamilyEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeFamilyEditorProps, {}>(lifecycles),
)(AccountEmployeeFamilyEditorView);