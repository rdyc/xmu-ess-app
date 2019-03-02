import { IEmployeeNotePostPayload, IEmployeeNotePutPayload } from '@account/classes/request/employeeNote';
import { IEmployeeNote } from '@account/classes/response/employeeNote';
import { WithAccountEmployeeNote, withAccountEmployeeNote } from '@account/hoc/withAccountEmployeeNote';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
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
import { AccountEmployeeNoteEditorView } from './AccountEmployeeNoteEditorView';
import { AccountEmployeeNoteFormData } from './form/AccountEmployeeNoteContainerForm';

interface OwnHandlers {
  handleValidate: (payload: AccountEmployeeNoteFormData) => FormErrors;
  handleSubmit: (payload: AccountEmployeeNoteFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnOption {

}

interface OwnRouteParams {
  employeeUid: string;
  noteId: string;  
}

interface OwnState {
  formMode: FormMode;
  employeeUid: string;
  noteId?: string | undefined;  
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeNoteEditorProps
  = WithAccountEmployeeNote
  & WithUser
  & WithLayout
  & WithMasterPage
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
    const { formMode, employeeUid, intl, noteId } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.accountEmployeeNoteDispatch;

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
    if (!noteId) {
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          employeeUid,
          resolve, 
          reject,
          data: payload as IEmployeeNotePutPayload, 
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeNoteEditorProps) => (response: IEmployeeNote) => {
    const { formMode, intl, history, employeeUid, } = props;
    const { alertAdd } = props.layoutDispatch;
    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(accountMessage.shared.message.createSuccess, { state: 'Employee Note' });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(accountMessage.shared.message.updateSuccess, { state: 'Employee Note', uid: response.id });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/account/employee/${employeeUid}/note/${response.id}`);
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
  }
};

const createProps: mapper<AccountEmployeeNoteEditorProps, OwnState> = (props: AccountEmployeeNoteEditorProps): OwnState => ({ 
  employeeUid: props.match.params.employeeUid,
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.createTitle, {state: 'Note'}),
  submitDialogContentText: props.intl.formatMessage(accountMessage.shared.confirm.createDescription, {state: 'note'}),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeNoteEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate, match } = this.props;
    const { loadDetailRequest } = this.props.accountEmployeeNoteDispatch;
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
        noteId: history.location.state.noteId,
        submitDialogTitle: this.props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, { state: 'Note'}),
        submitDialogContentText : this.props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, { state: 'Note'})
      });

      loadDetailRequest({
        employeeUid: match.params.employeeUid,
        noteId: history.location.state.noteId
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: `/account/employee/${match.params.employeeUid}/note`,
      title: intl.formatMessage(view.title, {state: 'Note'}),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentWillUnmount() {
    const { masterPage, accountEmployeeNoteDispatch } = this.props;

    masterPage.resetPage();

    accountEmployeeNoteDispatch.createDispose();
    accountEmployeeNoteDispatch.updateDispose();
  }
};

export const AccountEmployeeNoteEditor = compose<AccountEmployeeNoteEditorProps, OwnOption>(
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withWidth(),
  withAccountEmployeeNote,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeNoteEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeNoteEditorProps, {}>(lifecycles),
)(AccountEmployeeNoteEditorView);