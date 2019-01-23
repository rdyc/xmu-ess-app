import { IEmployeeEducationDeletePayload, IEmployeeEducationPostPayload, IEmployeeEducationPutPayload } from '@account/classes/request/employeeEducation';
import { IEmployeeEducation } from '@account/classes/response/employeeEducation';
import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
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
import { AccountEmployeeEducationEditorView } from './AccountEmployeeEducationEditorView';
import { AccountEmployeeEducationFormData } from './form/education/AccountEmployeeEducationContainer';

type EditAction = 'update' | 'delete';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeEducationFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeEducationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {
  formMode: FormMode | undefined;
  educationUid?: string;
  employeeUid: string;
  isOpenDialog: boolean;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeEducationFormData;
  handleDialogClose: () => void;
}

interface OwnRouteParams {
  employeeUid: string;
  educationUid: string;  
}

interface OwnState {

}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeEducationEditorProps
  = WithAccountEmployeeEducation
  & WithUser
  & WithLayout
  & WithWidth
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
    const { formMode, employeeUid, intl, editAction, educationUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest, deleteRequest } = props.accountEmployeeEducationDispatch;

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
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      if (educationUid) {
        if (editAction === 'update') {
          return new Promise((resolve, reject) => {
            updateRequest({
              employeeUid,
              resolve, 
              reject,
              data: payload as IEmployeeEducationPutPayload, 
            });
          });
        }

        if (editAction === 'delete') {
          return new Promise((resolve, reject) => {
            deleteRequest({
              employeeUid,
              resolve, 
              reject,
              data: payload as IEmployeeEducationDeletePayload, 
            });
          });
        }
      }
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeEducationEditorProps) => (response: IEmployeeEducation) => {
    const { formMode, intl, history, editAction, stateUpdate } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadAllRequest } = props.accountEmployeeEducationDispatch; 
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Employee Education' });
    }

    if (formMode === FormMode.Edit) {
      if (editAction && editAction === 'update') {
        message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Employee Education', uid: response.uid });
      } else {
        message = intl.formatMessage(accountMessage.shared.message.deleteSuccess, { state: 'Employee Education', uid: response.uid });
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

    loadAllRequest({
      employeeUid: props.employeeUid,
      filter: {
        direction: 'ascending'
      }
    });
    
    history.push(`/account/employee/${props.employeeUid}/education`);
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

const createProps: mapper<AccountEmployeeEducationEditorProps, OwnState> = (): OwnState => ({ 

});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeEducationEditorProps, {}> = {
  componentWillUnmount() {
    const { createDispose, updateDispose, deleteDispose } = this.props.accountEmployeeEducationDispatch;

    createDispose();
    updateDispose();
    deleteDispose();
  }
};

export default compose<AccountEmployeeEducationEditorProps, OwnOption>(
  withUser,
  withLayout,
  withRouter,
  withWidth(),
  withAccountEmployeeEducation,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeEducationEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeEducationEditorProps, {}>(lifecycles),
)(AccountEmployeeEducationEditorView);