import { IEmployeeAccessPostPayload, IEmployeeAccessPutPayload } from '@account/classes/request/employeeAccess';
import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystem } from '@common/classes/response';
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
import { AccountEmployeeAccessEditorView } from './AccountEmployeeAccessEditorView';
import { AccountEmployeeAccessFormData } from './form/access/AccountEmployeeAccessForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeAccessFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeAccessFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode;
  accessUid?: string | null;
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
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeAccessEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeAccessEditorProps) => (formData: AccountEmployeeAccessFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = [
      'companyUid', 'positionUid', 'roleUid', 'unitType', 'departmentType', 'levelType', 'start'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(accountMessage.access.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AccountEmployeeAccessEditorProps) => (formData: AccountEmployeeAccessFormData) => { 
    const { formMode, accessUid, intl, match, location } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeAccessDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const postPayload = {
      ...formData.information,
      employeeUid: match.params.employeeUid,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          employeeUid: match.params.employeeUid,
          data: postPayload as IEmployeeAccessPostPayload
        });
      });
    }

    // update checking
    if (!accessUid) {
      const message = intl.formatMessage(accountMessage.access.message.emptyProps);

      return Promise.reject(message);
    }

    const putPayload = {
      ...formData.information,
      employeeUid: match.params.employeeUid,
      uid: location.state.accessUid,
    };

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          employeeUid: match.params.employeeUid,
          data: putPayload as IEmployeeAccessPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeAccessEditorProps) => (response: ISystem) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadDetailDispose } = props.accountEmployeeAccessDispatch;
    
    let message: string = '';
    loadDetailDispose();

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.access.message.createSuccess, { uid: response.type });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.access.message.updateSuccess, { uid: response.type });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/account/employee/${props.match.params.employeeUid}/multiaccess`);
  },
  handleSubmitFail: (props: AccountEmployeeAccessEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(accountMessage.access.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.access.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<AccountEmployeeAccessEditorProps, OwnState> = (props: AccountEmployeeAccessEditorProps): OwnState => {
  const { location } = props;

  return {
    formMode: FormMode.New,
    accessUid: location.state && location.state.accessUid || '',
    submitDialogTitle: props.intl.formatMessage(accountMessage.access.dialog.createTitle),
    submitDialogContentText: props.intl.formatMessage(accountMessage.access.dialog.createDescription),
    submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
    submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeAccessDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: intl.formatMessage(accountMessage.access.dialog.createTitle),
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = intl.formatMessage(accountMessage.access.dialog.modifyTitle);

      stateUpdate({ 
        formMode: FormMode.Edit,
      });

      loadDetailRequest({
        employeeUid: this.props.match.params.employeeUid,
        accessUid: this.props.location.state.accessUid
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.Account,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage({id: view.title}),
        subTitle : ' '
      },
      parentUrl: `/account/employee/${this.props.match.params.employeeUid}/multiaccess`,
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
    const { layoutDispatch, appBarDispatch } = this.props;
    const { createDispose, updateDispose, loadDetailDispose } = this.props.accountEmployeeAccessDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    loadDetailDispose();
    createDispose();
    updateDispose();
  }
};

export default compose<AccountEmployeeAccessEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withAccountEmployeeAccess,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeAccessEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeAccessEditorProps, {}>(lifecycles),
)(AccountEmployeeAccessEditorView);