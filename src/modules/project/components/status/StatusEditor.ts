import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectStatusPutPayload } from '@project/classes/request/status';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { WithProjectStatus, withProjectStatus } from '@project/hoc/withProjectStatus';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { projectStatusMessage } from '@project/locales/messages/projectStatusMessage';
import styles from '@styles';
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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';

import { ProjectStatusFormData } from './forms/StatusForm';
import { StatusEditorView } from './StatusEditorView';

interface IOwnHandlers {
  handleValidate: (payload: ProjectStatusFormData) => FormErrors;
  handleSubmit: (payload: ProjectStatusFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {

}

interface IOwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  projectUid?: string | undefined;
  actionStatusType?: string | undefined;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type StatusEditorProps
  = WithProjectStatus
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const handlerCreators: HandleCreators<StatusEditorProps, IOwnHandlers> = {
  handleValidate: (props: StatusEditorProps) => (formData: ProjectStatusFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = ['statusType'];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || (formData.information[field] === undefined || formData.information[field] === null)) {
        errors.information[field] = props.intl.formatMessage(projectMessage.registration.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: StatusEditorProps) => (formData: ProjectStatusFormData) => { 
    const { projectUid, intl, stateUpdate } = props;
    const { user } = props.userState;
    const { updateRequest } = props.projectStatusDispatch;
    const { information } = formData;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!projectUid || !information.statusType) {
      const message = intl.formatMessage(projectStatusMessage.emptyProps);

      return Promise.reject(message);
    }

    // set actionStatusType in state
    stateUpdate({actionStatusType: information.statusType});

    // generate payload
    const payload: IProjectStatusPutPayload = {
      statusType: information.statusType
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      updateRequest({
        projectUid, 
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: StatusEditorProps) => (response: boolean) => {
    const { formMode, intl, history, projectUid, actionStatusType } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(projectStatusMessage.updateSuccess, {
        status: actionStatusType === WorkflowStatusType.Closed ? 'closed' : 're-opened'
      });
    }

    alertAdd({
      message,
      time: new Date()
    });

    if (projectUid) {
      history.push(`/project/requests/${projectUid}`);
    }
  },
  handleSubmitFail: (props: StatusEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    } else {
      alertAdd({
        time: new Date(),
        message: intl.formatMessage(projectStatusMessage.updateFailure),
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<StatusEditorProps, IOwnState> = (props: StatusEditorProps): IOwnState => {
  const { history } = props;

  return { 
    formMode: FormMode.Edit,
    projectUid: history.location.state.uid
  };
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<StatusEditorProps, {}> = {
  componentDidMount() {
    const { intl, history } = this.props;
    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;

    if (!(history.location.state === undefined || history.location.state === null) && user) {
      this.props.masterPage.changePage({
        uid: AppMenu.ProjectRegistrationRequest,
        parentUid: AppMenu.ProjectRegistration,
        parentUrl: `/project/requests/${history.location.state.uid}`,
        title: intl.formatMessage(projectMessage.registration.page.statusModifyTitle),
        description : intl.formatMessage(projectMessage.registration.page.statusModifySubHeader)
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: history.location.state.uid
      });
    }
  },
  componentWillUnmount() {
    const { projectStatusDispatch } = this.props;

    projectStatusDispatch.updateDispose();
  }
};

export const StatusEditor = compose<StatusEditorProps, {}>(
  setDisplayName('StatusEditor'),
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withProjectRegistration,
  withProjectStatus,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(StatusEditorView);