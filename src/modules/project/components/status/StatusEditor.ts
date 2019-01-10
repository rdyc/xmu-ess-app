import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectStatusPutPayload } from '@project/classes/request/status';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { WithProjectStatus, withProjectStatus } from '@project/hoc/withProjectStatus';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { projectStatusMessage } from '@project/locales/messages/projectStatusMessage';
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

import { ProjectStatusFormData } from './forms/StatusForm';
import { StatusEditorView } from './StatusEditorView';

interface OwnHandlers {
  handleValidate: (payload: ProjectStatusFormData) => FormErrors;
  handleSubmit: (payload: ProjectStatusFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  projectUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  projectUid?: string | undefined;
  actionStatusType?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type StatusEditorProps
  = WithProjectStatus
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<StatusEditorProps, OwnHandlers> = {
  handleValidate: (props: StatusEditorProps) => (formData: ProjectStatusFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = ['statusType'];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
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
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      alertAdd({
        time: new Date(),
        message: intl.formatMessage(projectStatusMessage.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<StatusEditorProps, OwnState> = (props: StatusEditorProps): OwnState => {
  const { history } = props;

  return { 
    formMode: FormMode.Edit,
    projectUid: history.location.state.uid
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<StatusEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history } = this.props;
    const { user } = this.props.userState;
    const { response } = this.props.projectRegisterState.detail;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage(projectMessage.registration.page.statusModifyTitle),
      subTitle : intl.formatMessage(projectMessage.registration.page.statusModifySubHeader)
    });
    
    layoutDispatch.navBackShow();

    if (!isNullOrUndefined(history.location.state) && !response && user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: history.location.state.uid
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, projectStatusDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    projectStatusDispatch.updateDispose();
  }
};

export const StatusEditor = compose<StatusEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectRegistration,
  withProjectStatus,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<StatusEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<StatusEditorProps, {}>(lifecycles),
)(StatusEditorView);