import { IEmployeeNotePostPayload, IEmployeeNotePutPayload } from '@account/classes/request/employeeNote';
import { IEmployeeNote } from '@account/classes/response/employeeNote';
import { WithAccountEmployeeNote, withAccountEmployeeNote } from '@account/hoc/withAccountEmployeeNote';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { NoteFormView } from './NoteFormView';

export interface INoteFormValue {
  id: string;
  employeeUid: string;
  text: string;
}

interface IOwnRouteParams {
  employeeUid: string;
  noteId: string;  
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: INoteFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<INoteFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: INoteFormValue, actions: FormikActions<INoteFormValue>) => void;
}

export type NoteFormProps
  = WithAccountEmployeeNote
  & WithCommonSystem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<NoteFormProps, IOwnState> = (props: NoteFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    // information
    employeeUid: props.match.params.employeeUid,
    id: 'Auto Generated',
    text: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<INoteFormValue>>({
    // information
    text: Yup.string()
      .label(props.intl.formatMessage(accountMessage.note.field.text))
      .required(),
  })
});

const stateUpdaters: StateUpdaters<NoteFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<NoteFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: NoteFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const noteId = props.history.location.state.noteId;
      const { isLoading } = props.accountEmployeeNoteState.detail;

      if (user && employeeUid && noteId && !isLoading) {
        props.accountEmployeeNoteDispatch.loadDetailRequest({
          employeeUid,
          noteId
        });
      }
    }
  },
  handleOnSubmit: (props: NoteFormProps) => (values: INoteFormValue, actions: FormikActions<INoteFormValue>) => {
    const { user } = props.userState;
    const employeeUid = props.match.params.employeeUid;
    let promise = new Promise((resolve, reject) => undefined);

    if (user && employeeUid) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeeNotePostPayload = {
          text: values.text
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.accountEmployeeNoteDispatch.createRequest({
            resolve,
            reject,
            employeeUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const noteId = props.history.location.state.noteId;

        // must have noteId
        if (noteId) {
          const payload: IEmployeeNotePutPayload = {
            id: Number(values.id),
            text: values.text,
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.accountEmployeeNoteDispatch.updateRequest({
              resolve,
              reject,
              employeeUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IEmployeeNote) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createSuccess : accountMessage.shared.message.updateSuccess, { uid: response.id, state: 'Note' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${employeeUid}/note/${response.id}`);
      })
      .catch((error: any) => {
        let err: IValidationErrorResponse | undefined = undefined;
        
        if (error.id) {
          err = error;
        }
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createFailure : accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<NoteFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: NoteFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeNoteState.detail;
    const { response: prevResponse } = prevProps.accountEmployeeNoteState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: INoteFormValue = {
            id: thisResponse.data.id.toString(),
            employeeUid: this.props.match.params.employeeUid,
            text: thisResponse.data.text,
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const NoteForm = compose<NoteFormProps, IOwnOption>(
  setDisplayName('NoteForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployeeNote,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(NoteFormView);