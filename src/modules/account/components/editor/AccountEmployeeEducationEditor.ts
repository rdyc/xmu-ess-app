import { IEmployeeEducationPostPayload, IEmployeeEducationPutPayload } from '@account/classes/request/employeeEducation';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
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
import { AccountEmployeeEducationEditorView } from './AccountEmployeeEducationEditorView';
import { AccountEmployeeEducationFormData } from './form/education/AccountEmployeeEducationContainer';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeEducationFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeEducationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {
  formMode: FormMode;
  educationUid?: string;
  dialogIsOpen: boolean;
  handleDialog: () => void;
}

interface OwnRouteParams {
  employeeUid: string;
  educationUid: string;  
}

interface OwnState {
  employeeUid: string;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeEducationEditorProps
  = WithAccountEmployeeEducation
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnOption
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeEducationEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeEducationEditorProps) => (formData: AccountEmployeeEducationFormData) => { 
    const errors = {
      education: {}
    };
  
    const requiredFields = [
      'degreeType', 'institution', 'major', 'start'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.education[field] || isNullOrUndefined(formData.education[field])) {
        errors.education[field] = props.intl.formatMessage(accountMessage.education.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AccountEmployeeEducationEditorProps) => (formData: AccountEmployeeEducationFormData) => { 
    const { formMode, employeeUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeEducationDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.education
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          employeeUid,
          resolve, 
          reject,
          data: payload as IEmployeeEducationPostPayload
        });
      });
    }

    // update checking
    if (!employeeUid) {
      const message = intl.formatMessage(accountMessage.education.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          employeeUid,
          resolve, 
          reject,
          data: payload as IEmployeeEducationPutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeEducationEditorProps) => (response: IEmployee) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.education.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.education.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/account/employee/${response.uid}`);
  },
  handleSubmitFail: (props: AccountEmployeeEducationEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(accountMessage.education.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.education.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<AccountEmployeeEducationEditorProps, OwnState> = (props: AccountEmployeeEducationEditorProps): OwnState => ({ 
  // formMode: FormMode.New,
  employeeUid: '',
  submitDialogTitle: props.intl.formatMessage(accountMessage.education.confirm.createTitle),
  submitDialogContentText: props.intl.formatMessage(accountMessage.education.confirm.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeEducationEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate, educationUid } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeEducationDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: accountMessage.education.page.newTitle,
      subTitle: accountMessage.education.page.newSubHeader,
    };

    if (!user) {
      return;
    }
    
    if (!isNullOrUndefined(history.location.state) && !isNullOrUndefined(educationUid)) {
      view.title = accountMessage.education.page.modifyTitle;
      view.subTitle = accountMessage.education.page.modifySubHeader;

      stateUpdate({ 
        employeeUid: history.location.state.uid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.education.confirm.modifyTitle),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.education.confirm.modifyDescription)
      });

      loadDetailRequest({
        educationUid,
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
      parentUrl: `/account/employee/${this.props.employeeUid}`,
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
    const { layoutDispatch, appBarDispatch, accountEmployeeEducationDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    accountEmployeeEducationDispatch.createDispose();
    accountEmployeeEducationDispatch.updateDispose();
  }
};

export default compose<AccountEmployeeEducationEditorProps, OwnOption>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withAccountEmployeeEducation,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeEducationEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeEducationEditorProps, {}>(lifecycles),
)(AccountEmployeeEducationEditorView);