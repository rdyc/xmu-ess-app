import { IEmployeeAccessDeletePayload, IEmployeeAccessPostPayload, IEmployeeAccessPutPayload } from '@account/classes/request/employeeAccess';
import { IEmployeeAccess } from '@account/classes/response/employeeAccess';
import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
import { AccountEmployeeAccessEditorView } from './AccountEmployeeAccessEditorView';
import { AccountEmployeeAccessFormData } from './form/access/AccountEmployeeAccessForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeAccessFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeAccessFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnProps {
  formMode?: FormMode;
  employeeUid: string;
  accessUid?: string;
  isOpenDialog: boolean;
  initialValues?: AccountEmployeeAccessFormData;
  handleDialogClose: () => void;
}

interface OwnState {
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeAccessEditorProps
  = WithAccountEmployeeAccess
  & WithUser
  & WithLayout
  & WithWidth
  & WithAppBar
  & RouteComponentProps
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnProps
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
    const { formMode, accessUid, intl, employeeUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest, deleteRequest } = props.accountEmployeeAccessDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const postPayload = {
      ...formData.information,
      employeeUid,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          employeeUid,
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
      employeeUid,
    };

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          resolve, 
          reject,
          employeeUid,
          data: putPayload as IEmployeeAccessPutPayload, 
        });
      });
    }

    const deletePayload = {
      employeeUid,
      uid: formData.information.uid,
    };

    if (formMode === FormMode.Delete) {
      return new Promise((resolve, reject) => {
        deleteRequest({
          resolve,
          reject,
          employeeUid,
          data: deletePayload as IEmployeeAccessDeletePayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeAccessEditorProps) => (response: IEmployeeAccess) => {
    const { formMode, intl, employeeUid, handleDialogClose } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadAllRequest } = props.accountEmployeeAccessDispatch;
    
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Multi Company Access', uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Multi Company Access', uid: response.uid });
    }

    if (formMode === FormMode.Delete) {
      message = intl.formatMessage(accountMessage.shared.message.deleteSuccess, { state: 'Multi Company Access' });
    }

    handleDialogClose();

    alertAdd({
      message,
      time: new Date()
    });

    loadAllRequest({
      employeeUid,
      filter: {
        direction: 'ascending'
      }
    });
    
    // history.push(`/account/employee/${employeeUid}/access`);
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
        message = intl.formatMessage(accountMessage.shared.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(accountMessage.shared.message.updateFailure);
      }

      if (formMode === FormMode.Delete) {
        message = intl.formatMessage(accountMessage.shared.message.deleteFailure);
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
  return {
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessEditorProps, {}> = {
  componentWillUnmount() {
    const { createDispose, updateDispose, deleteDispose } = this.props.accountEmployeeAccessDispatch;

    createDispose();
    updateDispose();
    deleteDispose();
  }
};

export default compose<AccountEmployeeAccessEditorProps, OwnProps>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withWidth(),
  withAccountEmployeeAccess,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeAccessEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeAccessEditorProps, {}>(lifecycles),
)(AccountEmployeeAccessEditorView);