import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectAssignmentPatchPayload } from '@project/classes/request/assignment';
import { IProjectList } from '@project/classes/response';
import { ProjectAssignmentFormData } from '@project/components/assignment/editor/ProjectAssignmentForm';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectOwnerMessage } from '@project/locales/messages/projectOwnerMessage';
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

import { ProjectAssignmentEditorView } from './ProjectAssignmentEditorView';

interface OwnHandlers {
  handleProjectChange: (project: IProjectList) => void;
  handleValidate: (payload: ProjectAssignmentFormData) => FormErrors;
  handleSubmit: (payload: ProjectAssignmentFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  projectUid: string;
}

interface OwnState {
  formMode: FormMode;
  projectUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type ProjectAssignmentEditorProps
  = WithProjectAssignment
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<ProjectAssignmentEditorProps, OwnHandlers> = {
  handleProjectChange: (props: ProjectAssignmentEditorProps) => (project: IProjectList) => { 
    console.log(project);
  },
  handleValidate: (props: ProjectAssignmentEditorProps) => (formData: ProjectAssignmentFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = ['projectUid'];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `project.assignment.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: ProjectAssignmentEditorProps) => (formData: ProjectAssignmentFormData) => { 
    const { intl } = props;
    const { user } = props.userState;
    const { patchRequest } = props.projectAssignmentDispatch;
    const { information } = formData;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!information.projectUid) {
      const message = intl.formatMessage(projectOwnerMessage.emptyProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload: IProjectAssignmentPatchPayload = {
      items: formData.items
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      patchRequest({
        resolve, 
        reject,
        projectUid: information.projectUid || '', 
        companyUid: user.company.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: ProjectAssignmentEditorProps) => (response: boolean) => {
    const { formMode, intl, history, projectUid } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(projectOwnerMessage.updateSuccess);
    }

    alertAdd({
      message,
      time: new Date()
    });

    if (projectUid) {
      history.push(`/project/details/${projectUid}`);
    }
  },
  handleSubmitFail: (props: ProjectAssignmentEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(projectOwnerMessage.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<ProjectAssignmentEditorProps, OwnState> = (props: ProjectAssignmentEditorProps): OwnState => {
  const { match } = props;
  
  return { 
    formMode:  match.params.projectUid ? FormMode.Edit : FormMode.New,
    projectUid: match.params.projectUid
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history } = this.props;
    const { user } = this.props.userState;
    const { response } = this.props.projectRegisterState.detail;
    const { loadDetailRequest } = this.props.projectRegisterDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentRequest,
      parentUid: AppMenu.ProjectAssignment,
      title: intl.formatMessage({id: 'project.assignment.form.request.title'}),
      subTitle : intl.formatMessage({id: 'project.assignment.form.request.subHeader'})
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
    const { layoutDispatch, appBarDispatch, projectAssignmentDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    projectAssignmentDispatch.patchDispose();
  }
};

export const ProjectAssignmentEditor = compose<ProjectAssignmentEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectRegistration,
  withProjectAssignment,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ProjectAssignmentEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<ProjectAssignmentEditorProps, {}>(lifecycles),
)(ProjectAssignmentEditorView);