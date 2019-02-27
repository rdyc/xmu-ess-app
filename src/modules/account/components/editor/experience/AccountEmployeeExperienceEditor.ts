import { IEmployeeExperiencePostPayload, IEmployeeExperiencePutPayload } from '@account/classes/request/employeeExperience';
import { IEmployeeExperience } from '@account/classes/response/employeeExperience';
import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
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
import { AccountEmployeeExperienceEditorView } from './AccountEmployeeExperienceEditorView';
import { AccountEmployeeExperienceFormData } from './form/AccountEmployeeExperienceContainerForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeExperienceFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeExperienceFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {
}

interface OwnRouteParams {
  employeeUid: string;
  experienceUid: string;
}

interface OwnState {
  formMode: FormMode;
  employeeUid: string;
  experienceUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeExperienceEditorProps
  = WithAccountEmployeeExperience
  & WithUser
  & WithAppBar
  & WithLayout
  & WithWidth
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnOption
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeExperienceEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeExperienceEditorProps) => (formData: AccountEmployeeExperienceFormData) => {
    const errors = {
      experience: {}
    };

    const requiredFields = [
      'company', 'position', 'start', 'end'
    ];

    requiredFields.forEach(field => {
      if (!formData.experience[field] || isNullOrUndefined(formData.experience[field])) {
        errors.experience[field] = props.intl.formatMessage(accountMessage.experience.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: AccountEmployeeExperienceEditorProps) => (formData: AccountEmployeeExperienceFormData) => {
    const { formMode, employeeUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeExperienceDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.experience
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          employeeUid,
          resolve,
          reject,
          data: payload as IEmployeeExperiencePostPayload
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
          employeeUid,
          resolve,
          reject,
          data: payload as IEmployeeExperiencePutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeExperienceEditorProps) => (response: IEmployeeExperience) => {
    const { formMode, intl, history, employeeUid } = props;
    const { alertAdd } = props.layoutDispatch;
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Employee Experience' });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.deleteSuccess, { state: 'Employee Experience', uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/account/employee/${employeeUid}/experience/${response.uid}`);
  },
  handleSubmitFail: (props: AccountEmployeeExperienceEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : (!isNullOrUndefined(submitError) ? submitError : intl.formatMessage(accountMessage.shared.message.createFailure))
      });
      console.log(submitError);
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

const createProps: mapper<AccountEmployeeExperienceEditorProps, OwnState> = (props: AccountEmployeeExperienceEditorProps): OwnState => ({
  employeeUid: props.match.params.employeeUid,
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.createTitle, {state: 'Experience'}),
  submitDialogContentText: props.intl.formatMessage(accountMessage.shared.confirm.createDescription, {state: 'Experience'}),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeExperienceEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate, match } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeExperienceDispatch;
    const { user } = this.props.userState;

    const view = {
      title: accountMessage.shared.page.newTitle,
      subTitle: accountMessage.shared.page.newSubHeader
    };

    if (!user) {
      return;
    }

    if (!isNullOrUndefined(history.location.state)) {
      view.title = accountMessage.shared.page.modifyTitle;
      view.subTitle = accountMessage.shared.page.modifySubHeader;

      stateUpdate({
        formMode: FormMode.Edit,
        employeeUid: match.params.employeeUid,
        experienceUid: history.location.state.experienceUid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, { state: 'Experience'}),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, { state: 'Experience'})
      });

      loadDetailRequest({
        employeeUid: match.params.employeeUid,
        experienceUid: history.location.state.experienceUid
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.LookupEmployee,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(view.title, {state: 'Experience'}),
        subTitle : intl.formatMessage(view.subTitle)
      },
      parentUrl: `/account/employee/${match.params.employeeUid}/experience`,
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
    const { layoutDispatch, appBarDispatch, accountEmployeeExperienceDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    accountEmployeeExperienceDispatch.createDispose();
    accountEmployeeExperienceDispatch.updateDispose();
  }
};

export default compose<AccountEmployeeExperienceEditorProps, OwnOption>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withWidth(),
  withAccountEmployeeExperience,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeExperienceEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeExperienceEditorProps, {}>(lifecycles),
)(AccountEmployeeExperienceEditorView);