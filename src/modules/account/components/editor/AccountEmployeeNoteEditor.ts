import { IEmployeeNoteDeletePayload, IEmployeeNotePostPayload, IEmployeeNotePutPayload } from '@account/classes/request/employeeNote';
import { IEmployeeNote } from '@account/classes/response/employeeNote';
import { WithAccountEmployeeNote, withAccountEmployeeNote } from '@account/hoc/withAccountEmployeeNote';
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
import { AccountEmployeeNoteEditorView } from './AccountEmployeeNoteEditorView';
import { AccountEmployeeNoteFormData } from './form/note/AccountEmployeeNoteContainer';

type EditAction = 'update' | 'delete';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeNoteFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeNoteFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
  handleValidity: (valid: boolean) => void;
}

interface OwnOption {
  formMode: FormMode | undefined;
  noteId?: string;
  employeeUid: string;
  isOpenDialog: boolean;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeNoteFormData;
  handleDialogClose: () => void;
}

interface OwnRouteParams {
  employeeUid: string;
  noteId: string;  
}

interface OwnState {
  validity: boolean;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeNoteEditorProps
  = WithAccountEmployeeNote
  & WithUser
  & WithLayout
  & WithWidth
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnOption
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<AccountEmployeeNoteEditorProps, OwnHandlers> = {
  handleValidate: (props: AccountEmployeeNoteEditorProps) => (formData: AccountEmployeeNoteFormData) => { 
    const errors = {
      note: {}
    };
  
    const requiredFields = [
      'text'
    ];
  
    requiredFields.forEach(field => {
      if (!formData.note[field] || isNullOrUndefined(formData.note[field])) {
        errors.note[field] = props.intl.formatMessage(accountMessage.note.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: AccountEmployeeNoteEditorProps) => (formData: AccountEmployeeNoteFormData) => { 
    const { formMode, employeeUid, intl, editAction, noteId } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest, deleteRequest } = props.accountEmployeeNoteDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.note
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          employeeUid,
          resolve, 
          reject,
          data: payload as IEmployeeNotePostPayload
        });
      });
    }

    // update checking
    if (!employeeUid) {
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      if (noteId) {
        if (editAction === 'update') {
          return new Promise((resolve, reject) => {
            updateRequest({
              employeeUid,
              resolve, 
              reject,
              data: payload as IEmployeeNotePutPayload, 
            });
          });
        }

        if (editAction === 'delete') {
          return new Promise((resolve, reject) => {
            deleteRequest({
              employeeUid,
              resolve, 
              reject,
              data: payload as IEmployeeNoteDeletePayload, 
            });
          });
        }
      }
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeNoteEditorProps) => (response: IEmployeeNote) => {
    const { formMode, intl, editAction, handleDialogClose } = props;
    const { alertAdd } = props.layoutDispatch;
    const { loadAllRequest } = props.accountEmployeeNoteDispatch; 
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Employee Note' });
    }

    if (formMode === FormMode.Edit) {
      if (editAction && editAction === 'update') {
        message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Employee Note'});
      } else {
        message = intl.formatMessage(accountMessage.shared.message.deleteSuccess, { state: 'Employee Note'});
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
  },
  handleSubmitFail: (props: AccountEmployeeNoteEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
  },
  handleValidity: (props: AccountEmployeeNoteEditorProps) => (valid: boolean) => {
    props.stateUpdate({
      validity: valid
    });
  }
};

const createProps: mapper<AccountEmployeeNoteEditorProps, OwnState> = (): OwnState => ({ 
  validity: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeNoteEditorProps, {}> = {
  componentWillUnmount() {
    const { createDispose, updateDispose, deleteDispose } = this.props.accountEmployeeNoteDispatch;

    createDispose();
    updateDispose();
    deleteDispose();
  }
};

export default compose<AccountEmployeeNoteEditorProps, OwnOption>(
  withUser,
  withLayout,
  withRouter,
  withWidth(),
  withAccountEmployeeNote,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeNoteEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeNoteEditorProps, {}>(lifecycles),
)(AccountEmployeeNoteEditorView);