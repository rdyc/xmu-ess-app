import { IEmployeeTrainingPostPayload, IEmployeeTrainingPutPayload } from '@account/classes/request/employeeTraining';
import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
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
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { AccountEmployeeTrainingEditorView } from './AccountEmployeeTrainingEditorView';
import { AccountEmployeeTrainingFormData } from './form/AccountEmployeeTrainingContainerForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeTrainingFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeTrainingFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {

}

interface OwnRouteParams {
  employeeUid: string;
  trainingUid: string;
}

interface OwnState {
  formMode: FormMode;
  employeeUid: string;
  trainingUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeTrainingEditorProps
  = WithAccountEmployeeTraining
  & WithUser
  & WithLayout
  & WithAppBar
  & WithWidth
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnOption
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeTrainingEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeTrainingEditorProps) => (formData: AccountEmployeeTrainingFormData) => {
    const errors = {
      training: {}
    };

    const requiredFields = [
      'name', 'start', 'end', 'organizer', 'trainingType', 'certificationType'
    ];

    requiredFields.forEach(field => {
      if (!formData.training[field] || isNullOrUndefined(formData.training[field])) {
        errors.training[field] = props.intl.formatMessage(accountMessage.training.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: AccountEmployeeTrainingEditorProps) => (formData: AccountEmployeeTrainingFormData) => {
    const { formMode, employeeUid, intl, trainingUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeTrainingDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.training,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          employeeUid,
          resolve,
          reject,
          data: payload as IEmployeeTrainingPostPayload
        });
      });
    }

    // update checking
    if (!trainingUid && employeeUid) {
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
          return new Promise((resolve, reject) => {
            updateRequest({
              employeeUid,
              resolve,
              reject,
              data: payload as IEmployeeTrainingPutPayload,
            });
          });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeTrainingEditorProps) => (response: IEmployeeTraining) => {
    const { formMode, intl, history, employeeUid } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Employee Training', uid: `${employeeUid}` });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Employee Training', uid: `${employeeUid}`  });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/account/employee/${employeeUid}/training/${response.uid}`);
  },
  handleSubmitFail: (props: AccountEmployeeTrainingEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : (!isNullOrUndefined(submitError) ? submitError : intl.formatMessage(accountMessage.shared.message.createFailure))
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

const createProps: mapper<AccountEmployeeTrainingEditorProps, OwnState> = (props: AccountEmployeeTrainingEditorProps): OwnState => ({ 
  employeeUid: props.match.params.employeeUid,
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.createTitle, { state: 'Training' }),
  submitDialogContentText: props.intl.formatMessage(accountMessage.shared.confirm.createDescription, { state: 'training' }),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate, match } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeTrainingDispatch;
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
        trainingUid: history.location.state.trainingUid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, { state: 'Training' }),
        submitDialogContentText: this.props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, { state: 'training' })
      });

      loadDetailRequest({
        employeeUid: match.params.employeeUid,
        trainingUid: history.location.state.trainingUid
      });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.LookupEmployee,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(view.title, { state: 'Training' }),
        subTitle: intl.formatMessage(view.subTitle)
      },
      parentUrl: `/account/employee/${match.params.employeeUid}/training`,
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
    const { layoutDispatch, appBarDispatch, accountEmployeeTrainingDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    accountEmployeeTrainingDispatch.createDispose();
    accountEmployeeTrainingDispatch.updateDispose();
  }
};

export const AccountEmployeeTrainingEditor = compose<AccountEmployeeTrainingEditorProps, OwnOption>(
  withUser,
  withLayout,
  withAppBar,
  withWidth(),
  withRouter,
  withAccountEmployeeTraining,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeTrainingEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeTrainingEditorProps, {}>(lifecycles),
)(AccountEmployeeTrainingEditorView);
