import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectAssignmentPatchPayload } from '@project/classes/request/assignment';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
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
import { ProjectAssignmentFormData, ProjectAssignmentItemFormData } from './ProjectAssignmentForm';

interface OwnHandlers {
  generateInitialData: () => IProjectAssignmentDetail | undefined;
  generateInitialValues: () => ProjectAssignmentFormData | undefined;
  handleValidate: (values: ProjectAssignmentFormData) => any;
  handleSubmit: (values: ProjectAssignmentFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  projectUid?: string | undefined;
  assignmentUid?: string | undefined;
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
  & RouteComponentProps
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ProjectAssignmentEditorProps, OwnState> = (props: ProjectAssignmentEditorProps): OwnState => {
  const { history } = props;
  
  const state = history.location.state;

  return { 
    formMode:  state ? FormMode.Edit : FormMode.New,
    companyUid: state ? state.companyUid : undefined,
    projectUid: state ? state.projectUid : undefined,
    assignmentUid: state ? state.assignmentUid : undefined
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlers: HandleCreators<ProjectAssignmentEditorProps, OwnHandlers> = {
  generateInitialData: (props: ProjectAssignmentEditorProps) => (): IProjectAssignmentDetail | undefined => {
    const { response } = props.projectAssignmentState.detail; 

    if (response && response.data && props.formMode === FormMode.Edit) {
      return response.data;
    }
      
    return undefined;
    },
  generateInitialValues: (props: ProjectAssignmentEditorProps) => (): ProjectAssignmentFormData | undefined => {
    const { response } = props.projectAssignmentState.detail; 

    if (response && response.data) {
      const items: ProjectAssignmentItemFormData[] = [];

      if (response.data.items) {
        response.data.items.forEach(item => 
          items.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            role: item.role,
            jobDescription: item.jobDescription,
            mandays: item.mandays,
            allocatedHours: item.allocatedHours,
            consumedHours: item.consumedHours,
            statusType: item.statusType,
            status: item.status,
            rejectedReason: item.rejectedReason
          })
        );
      }

      return {
        items,
        projectUid: response.data.projectUid
      };
    }
      
    return undefined;
  },
  handleValidate: (props: ProjectAssignmentEditorProps) => (values: ProjectAssignmentFormData) => { 
    const errors = {};
  
    const requiredFields = ['projectUid'];
  
    requiredFields.forEach(field => {
      if (!values[field] || isNullOrUndefined(values[field])) {
        Object.assign(errors, {[field]: props.intl.formatMessage(projectMessage.assignment.fieldFor(field, 'fieldRequired'))});
      }
    });

    if (values.items) {
      const requiredItemFields = ['employeeUid', 'role', 'mandays'];
      
      const itemErrors: any[] = [];
      
      values.items.forEach((item, index) => {
        const itemError: any = {};
        
        if (!item) { return ; }

        requiredItemFields.forEach(field => {
          if (!item[field] || isNullOrUndefined(item[field])) {
            Object.assign(itemError, {[`${field}`]: props.intl.formatMessage(projectMessage.assignment.fieldFor(field, 'fieldRequired'))});
          }
        });

        itemErrors.push(itemError);
      });

      if (itemErrors.length) {
        Object.assign(errors, {
          items: itemErrors
        });
      }
    }
    
    return errors;
  },
  handleSubmit: (props: ProjectAssignmentEditorProps) => (values: ProjectAssignmentFormData) => { 
    const { intl } = props;
    const { user } = props.userState;
    const { patchRequest } = props.projectAssignmentDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!values.projectUid) {
      const message = intl.formatMessage(projectMessage.assignment.message.invalidProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload: IProjectAssignmentPatchPayload = {
      items: values.items || []
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      patchRequest({
        resolve, 
        reject,
        projectUid: values.projectUid || '', 
        companyUid: user.company.uid,
        data: payload
      });
    }); 
  },
  handleSubmitSuccess: (props: ProjectAssignmentEditorProps) => (response: IProjectAssignmentDetail) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(projectMessage.assignment.message.updateSuccess);
    } else {
      message = intl.formatMessage(projectMessage.assignment.message.createSuccess);
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/project/assignments/${response.uid}`);
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
        message: intl.formatMessage(projectMessage.assignment.message.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, formMode, companyUid, assignmentUid } = this.props;
    const { response } = this.props.projectAssignmentState.detail;
    const { loadDetailRequest } = this.props.projectAssignmentDispatch;

    const view: any = {};

    switch (formMode) {
      case FormMode.Edit:
        Object.assign(view, {
          title: intl.formatMessage(projectMessage.assignment.page.modifyTitle),
          subTitle: intl.formatMessage(projectMessage.assignment.page.modifySubHeader)
        });
        break;
    
      default:
        Object.assign(view, {
          title: intl.formatMessage(projectMessage.assignment.page.newTitle),
          subTitle: intl.formatMessage(projectMessage.assignment.page.newSubHeader)
        });
        break;
    }

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentRequest,
      parentUid: AppMenu.ProjectAssignment,
      ...view
    });

    layoutDispatch.navBackShow();

    // editing mode: load detail if not exist
    if (companyUid && assignmentUid && !response) {
      loadDetailRequest({
        companyUid,
        assignmentUid
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, projectAssignmentDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    projectAssignmentDispatch.loadDetailDispose();
    projectAssignmentDispatch.patchDispose();
  }
};

export const ProjectAssignmentEditorForm = compose<ProjectAssignmentEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectRegistration,
  withProjectAssignment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlers),
  lifecycle(lifecycles)
)(ProjectAssignmentEditorView);