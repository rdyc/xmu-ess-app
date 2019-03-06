import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
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
  setDisplayName,
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
import { IProjectAssignmentFormData, IProjectAssignmentItemFormData } from './ProjectAssignmentForm';

interface IOwnState {
  formMode: FormMode;
  companyUid?: string;
  projectUid?: string;
  assignmentUid?: string;
  initialData?: IProjectAssignmentDetail;
  initialValues?: Partial<IProjectAssignmentFormData>;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setInitialData: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandlers {
  handleOnValidate: (values: IProjectAssignmentFormData) => any;
  handleOnSubmit: (values: IProjectAssignmentFormData) => void;
  handleOnSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleOnSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

export type ProjectAssignmentEditorProps 
  = WithProjectAssignment
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<ProjectAssignmentEditorProps, IOwnState> = (props: ProjectAssignmentEditorProps): IOwnState => {
  const { history } = props;
  
  const state = history.location.state;

  return { 
    formMode: state ? FormMode.Edit : FormMode.New,
    companyUid: state ? state.companyUid : undefined,
    projectUid: state ? state.projectUid : undefined,
    assignmentUid: state ? state.assignmentUid : undefined
  };
};

const stateUpdaters: StateUpdaters<ProjectAssignmentEditorProps, IOwnState, IOwnStateUpdaters> = {
  setInitialData: (state: IOwnState) => (initialData: IProjectAssignmentDetail): Partial<IOwnState> => ({
    initialData
  }),
  setInitialValues: (state: IOwnState) => (initialValues: Partial<IProjectAssignmentFormData>): Partial<IOwnState> => ({
    initialValues
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlers: HandleCreators<ProjectAssignmentEditorProps, IOwnHandlers> = {
  handleOnValidate: (props: ProjectAssignmentEditorProps) => (values: IProjectAssignmentFormData) => { 
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
  handleOnSubmit: (props: ProjectAssignmentEditorProps) => (values: IProjectAssignmentFormData) => { 
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
  handleOnSubmitSuccess: (props: ProjectAssignmentEditorProps) => (response: IProjectAssignmentDetail) => {
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
  handleOnSubmitFail: (props: ProjectAssignmentEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
    const { intl, formMode, companyUid, assignmentUid } = this.props;
    const { loadDetailRequest, loadDetailDispose } = this.props.projectAssignmentDispatch;

    const view = {
      title: projectMessage.assignment.page.newTitle,
      description: projectMessage.assignment.page.newSubHeader
    };

    switch (formMode) {
      case FormMode.Edit:
        view.title = projectMessage.assignment.page.modifyTitle;
        view.description = projectMessage.assignment.page.modifySubHeader;

        // editing mode: load detail if not exist
        if (companyUid && assignmentUid) {
          loadDetailRequest({
            companyUid,
            assignmentUid
          });
        }
        break;
    
      default:
        // new mode
        loadDetailDispose();
        break;
    }

    this.props.masterPage.changePage({
      uid: AppMenu.ProjectAssignmentRequest,
      parentUid: AppMenu.ProjectAssignment,
      parentUrl: this.props.assignmentUid ? `/project/assignments/${this.props.assignmentUid}` : '/project/assignments',
      title: intl.formatMessage(view.title),
      description: intl.formatMessage(view.description)
    });
  },
  componentDidUpdate(prevProps: ProjectAssignmentEditorProps) {
    if (this.props.projectAssignmentState.detail !== prevProps.projectAssignmentState.detail) {
      const { isExpired, response } = this.props.projectAssignmentState.detail;

      if (!isExpired && response && response.data) {
        // set project data
        this.props.setInitialData(response.data);

        // set assignment items
        const items: IProjectAssignmentItemFormData[] = [];

        if (response && response.data &&  response.data.items) {
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

          this.props.setInitialValues({
            items,
            projectUid: response.data.projectUid
          });
        }
      }
    }
  },
  componentWillUnmount() {
    const { projectAssignmentDispatch } = this.props;

    projectAssignmentDispatch.loadDetailDispose();
    projectAssignmentDispatch.patchDispose();
  }
};

export const ProjectAssignmentEditorForm = compose<ProjectAssignmentEditorProps, {}>(
  setDisplayName('ProjectAssignmentEditorForm'),
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withProjectRegistration,
  withProjectAssignment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlers),
  lifecycle(lifecycles)
)(ProjectAssignmentEditorView);