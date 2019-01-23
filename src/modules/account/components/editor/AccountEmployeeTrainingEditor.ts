import { IEmployeeTrainingDeletePayload, IEmployeeTrainingPostPayload, IEmployeeTrainingPutPayload } from '@account/classes/request/employeeTraining';
import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { AccountEmployeeTrainingEditorView } from './AccountEmployeeTrainingEditorView';
import { AccountEmployeeTrainingFormData } from './form/training/AccountEmployeeTrainingContainerForm';

type EditAction = 'update' | 'delete';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeTrainingFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeTrainingFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {
  formMode: FormMode | undefined;
  trainingUid?: string;
  employeeUid: string;
  isOpenDialog: boolean;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeTrainingFormData;
  handleDialogClose: () => void;
}
interface OwnRouteParams {
  employeeUid: string;
  trainingUid: string;
}

interface OwnState {
  // employeeUid: string;
  // submitDialogTitle: string;
  // submitDialogContentText: string;
  // submitDialogCancelText: string;
  // submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeTrainingEditorProps
  = WithAccountEmployeeTraining
  & WithUser
  & WithLayout
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
      information: {}
    };

    const requiredFields = [
      'name', 'start', 'end', 'organizer', 'trainingType', 'certificationType'
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(accountMessage.training.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: AccountEmployeeTrainingEditorProps) => (formData: AccountEmployeeTrainingFormData) => {
    const { formMode, employeeUid, intl, editAction, trainingUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest, deleteRequest } = props.accountEmployeeTrainingDispatch;

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
          employeeUid,
          resolve,
          reject,
          data: payload as IEmployeeTrainingPostPayload
        });
      });
    }

    // update checking
    if (!employeeUid) {
      const message = intl.formatMessage(accountMessage.employee.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      if (trainingUid) {
        if (editAction === 'update') {
          return new Promise((resolve, reject) => {
            updateRequest({
              employeeUid,
              resolve,
              reject,
              data: payload as IEmployeeTrainingPutPayload,
            });
          });
        }

        if (editAction === 'delete') {
          return new Promise((resolve, reject) => {
            deleteRequest({
              employeeUid,
              resolve,
              reject,
              data: payload as IEmployeeTrainingDeletePayload
            });
          });
        }
      }
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeTrainingEditorProps) => (response: IEmployeeTraining) => {
    const { formMode, intl, history, editAction, stateUpdate } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadListRequest } = props.accountEmployeeTrainingDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.training.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      if (editAction && editAction === 'update') {
        message = intl.formatMessage(accountMessage.training.message.updateSuccess, { uid: response.uid });
      } else {
        message = intl.formatMessage(accountMessage.training.message.deleteSuccess, { uid: response.uid });
      }
    }

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });

    alertAdd({
      message,
      time: new Date()
    });

    loadListRequest({
      employeeUid: props.employeeUid,
      filter: {
        direction: 'ascending'
      }
    });

    history.push(`/account/employee/${props.employeeUid}/training`);
  },
  handleSubmitFail: (props: AccountEmployeeTrainingEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(accountMessage.training.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.training.message.updateFailure);
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
  //
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate, employeeUid } = this.props;
    // const { loadDetailRequest } = this.props.accountEmployeeTrainingDispatch;
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
        employeeUid,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.training.confirm.modifyTitle),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.training.confirm.modifyDescription)
      });

      // loadDetailRequest({
      //   employeeUid: history.location.state.uid,
      //   trainingUid: history.location.state.uid
      // });
    }

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.Account,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(view.title),
        subTitle : intl.formatMessage(view.subTitle)
      },
      parentUrl: `/account/employee`,
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
    const { accountEmployeeTrainingDispatch } = this.props;

    // layoutDispatch.changeView(null);
    // layoutDispatch.navBackHide();
    // layoutDispatch.moreHide();

    // appBarDispatch.dispose();

    accountEmployeeTrainingDispatch.createDispose();
    accountEmployeeTrainingDispatch.updateDispose();
  }
};

export default compose<AccountEmployeeTrainingEditorProps, OwnOption>(
  withUser,
  withLayout,
  withWidth(),
  withRouter,
  withAccountEmployeeTraining,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeTrainingEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeTrainingEditorProps, {}>(lifecycles),
)(AccountEmployeeTrainingEditorView);