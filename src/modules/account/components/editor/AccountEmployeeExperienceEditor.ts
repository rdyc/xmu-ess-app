import { IEmployeeExperienceDeletePayload, IEmployeeExperiencePostPayload, IEmployeeExperiencePutPayload } from '@account/classes/request/employeeExperience';
import { IEmployeeExperience } from '@account/classes/response/employeeExperience';
import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
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
import { AccountEmployeeExperienceEditorView } from './AccountEmployeeExperienceEditorView';
import { AccountEmployeeExperienceFormData } from './form/experience/AccountEmployeeExperienceContainer';

type EditAction = 'update' | 'delete';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeExperienceFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeExperienceFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {
  formMode: FormMode | undefined;
  experienceUid?: string;
  employeeUid: string;
  isOpenDialog: boolean;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeExperienceFormData;
  handleDialogClose: () => void;
}

interface OwnRouteParams {
  employeeUid: string;
  experienceUid: string;  
}

interface OwnState {

}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeExperienceEditorProps
  = WithAccountEmployeeExperience
  & WithUser
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
    const { formMode, employeeUid, intl, editAction, experienceUid } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest, deleteRequest } = props.accountEmployeeExperienceDispatch;

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
      if (experienceUid) {
        if (editAction === 'update') {
          return new Promise((resolve, reject) => {
            updateRequest({
              employeeUid,
              resolve, 
              reject,
              data: payload as IEmployeeExperiencePutPayload, 
            });
          });
        }

        if (editAction === 'delete') {
          return new Promise((resolve, reject) => {
            deleteRequest({
              employeeUid,
              resolve, 
              reject,
              data: payload as IEmployeeExperienceDeletePayload, 
            });
          });
        }
      }
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeExperienceEditorProps) => (response: IEmployeeExperience) => {
    const { formMode, intl, history, editAction, handleDialogClose } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadAllRequest } = props.accountEmployeeExperienceDispatch; 
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Employee Experience' });
    }

    if (formMode === FormMode.Edit) {
      if (editAction && editAction === 'update') {
        message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Employee Experience', uid: response.uid });
      } else {
        message = intl.formatMessage(accountMessage.shared.message.deleteSuccess, { state: 'Employee Experience', uid: response.uid });
      }
    }

    handleDialogClose();

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
    
    history.push(`/account/employee/${props.employeeUid}/experience`);
  },
  handleSubmitFail: (props: AccountEmployeeExperienceEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

const createProps: mapper<AccountEmployeeExperienceEditorProps, OwnState> = (): OwnState => ({ 

});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeExperienceEditorProps, {}> = {
  componentWillUnmount() {
    const { createDispose, updateDispose, deleteDispose } = this.props.accountEmployeeExperienceDispatch;

    createDispose();
    updateDispose();
    deleteDispose();
  }
};

export default compose<AccountEmployeeExperienceEditorProps, OwnOption>(
  withUser,
  withLayout,
  withRouter,
  withWidth(),
  withAccountEmployeeExperience,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeExperienceEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeExperienceEditorProps, {}>(lifecycles),
)(AccountEmployeeExperienceEditorView);