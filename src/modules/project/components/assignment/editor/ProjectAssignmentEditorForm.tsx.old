import { SelectEmployee } from '@account/components/select';
import { ICommonSystem } from '@common/classes';
import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputTextArea } from '@layout/components/input/textArea';
import { Submission } from '@layout/components/submission/Submission';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withUser } from '@layout/hoc/withUser';
import { WithUser } from '@lookup/components/leave';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectAssignmentPatchPayload } from '@project/classes/request/assignment';
import { IProjectAssignmentDetail, IProjectList } from '@project/classes/response';
import { SelectProject } from '@project/components/select/project';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
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
import {
  Field,
  FieldArray,
  FormErrors,
  getFormValues,
  InjectedFormProps,
  reduxForm,
  WrappedFieldArrayProps,
} from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

import { ProjectAssignment } from '../detail/shared/ProjectAssignment';

// ----------------------------------------------------------------------------
// ProjectAssignmentForm.tsx
// ----------------------------------------------------------------------------
const isComplete = (statusType?: string | null | undefined): boolean => {
  let result = false;

  if (statusType) {
    const completes = [
      WorkflowStatusType.Accepted,
      WorkflowStatusType.Rejected,
    ];

    result = completes.indexOf(statusType as WorkflowStatusType) !== -1;
  }
  
  return result;
};

const ProjectAssignmentItemFormView: React.SFC<WrappedFieldArrayProps<ProjectAssignmentItemFormData> & ProjectAssignmentFormProps> = props => (
  <Grid container spacing={16}>
    {
      props.fields.map((field, index) => {
        const item = props.fields.get(index);
        const isItemComplete = isComplete(item.statusType);

        return (
          <Grid key={index} item xs={12} md={6}>
            <Card>
              <CardHeader 
                title={`#${index + 1} - ${item.uid || 'Draft'}`}
                subheader={`${item.status && item.status.value || 'Draft'} ${item.rejectedReason || ''}`}
                titleTypographyProps={{variant: 'body2'}}
                action={
                  !isItemComplete &&
                  <IconButton onClick={() => props.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <div>
                  <Field 
                    type="text"
                    name={`${field}.employeeUid`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.employeeUid)}
                    placeholder={props.intl.formatMessage(projectMessage.assignment.field.employeeUidPlaceholder)}
                    required={true}
                    companyUids={props.userState.user && [props.userState.user.company.uid]}
                    disabled={isItemComplete}
                    component={SelectEmployee}
                  />
                  <Field 
                    type="text"
                    name={`${field}.role`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.role)}
                    placeholder={props.intl.formatMessage(projectMessage.assignment.field.rolePlaceholder)}
                    required={true}
                    disabled={isItemComplete}
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.jobDescription`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.jobDesc)}
                    placeholder={props.intl.formatMessage(projectMessage.assignment.field.jobDescPlaceholder)}
                    disabled={isItemComplete}
                    component={InputTextArea}
                  />
                  <Field 
                    type="number"
                    name={`${field}.mandays`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
                    placeholder={props.intl.formatMessage(projectMessage.assignment.field.mandaysPlaceholder)}
                    required={true}
                    disabled={isItemComplete}
                    component={InputNumber}
                    onChange={(event: any, newValue: any) => {
                      if (!isNaN(newValue)) {
                        props.change(`${field}.hours`, newValue * 8);
                      }
                    }}
                  />
                  <Field 
                    type="number"
                    name={`${field}.hours`}
                    label={props.intl.formatMessage(projectMessage.assignment.field.hours)}
                    disabled={true}
                    component={InputNumber}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        );
      })
    }

    <Grid item xs={12}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title={props.intl.formatMessage(projectMessage.assignment.section.memberAddTitle)}
              subheader={props.intl.formatMessage(projectMessage.assignment.section.memberAddSubHeader)}
            />
            <CardActions>
              <Button onClick={() => props.fields.push({
                uid: null,
                employeeUid: '',
                role: '',
                jobDescription: '',
                mandays: 0,
                hours: 0
              })}>
                {props.intl.formatMessage(projectMessage.assignment.action.addMember)}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {
          props.fields.length > 0 &&
          <Grid item xs={12} md={6}>
            <Submission 
              valid={props.valid}
              reset={props.reset}
              submitting={props.submitting}
              />
          </Grid>
        }
      </Grid>
    </Grid>
  </Grid>
);

const ProjectAssignmentFormView: React.SFC<ProjectAssignmentFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={4}>
        <ProjectAssignment 
          formMode={props.formMode} 
          data={props.currentProject}
        >
          {
            // just display project select when the form is being in new mode
            props.formMode === FormMode.New &&
            <Field
              name="projectUid"
              component={(context: any) => 
                <SelectProject 
                  {...context}
                  label={props.intl.formatMessage(projectMessage.assignment.field.projectUid)}
                  placeholder={props.intl.formatMessage(projectMessage.assignment.field.projectUidPlaceholder)}
                  filter={props.projectFilter}
                  onSelected={props.handleProjectChange}
                />
              }
            />
          }
        </ProjectAssignment>
      </Grid>

      {
        props.currentProject &&
        <Grid item xs={12} md={8}>
          <FieldArray 
            name="items" 
            props={props} 
            component={ProjectAssignmentItemFormView}
            />
        </Grid> 
      }

      {/* <Grid item xs={12} md={4}>
        <Card>
          <CardHeader 
            title="Values"
            subheader="form values as object"
          />
          <CardContent>
            <pre>{JSON.stringify(props.formValues, null, 2)}</pre>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  </form>
);

// ----------------------------------------------------------------------------
// ProjectAssignmentForm.ts
// ----------------------------------------------------------------------------

interface ProjectAssignmentItemFormData {
  uid: string | null;
  employeeUid: string;
  role: string | null;
  jobDescription: string | null;
  mandays: number;
  hours: number;
  statusType?: string | null;
  status?: ICommonSystem | null;
  rejectedReason?: string | null;
}
interface ProjectAssignmentFormData {
  projectUid: string;
  items: ProjectAssignmentItemFormData[] | undefined;
}

interface OwnFormProps {
  formMode: FormMode;
  initialData?: IProjectAssignmentDetail | undefined;
}

interface OwnFormHandlers {
  handleEventListener: (event: CustomEvent) => void;
  handleProjectChange: (project: IProjectList | undefined) => void;
}

interface OwnFormState {
  currentProject?: IProjectAssignmentDetail | undefined;
  projectFilter?: IProjectRegistrationGetListFilter | undefined;
}

interface OwnFormStateUpdaters extends StateHandlerMap<OwnFormState> {
  setProject: StateHandler<OwnFormState>;
  setProjectHours: StateHandler<OwnFormState>;
}

interface FormValueProps {
  formValues: ProjectAssignmentFormData;
}

type ProjectAssignmentFormProps 
  = InjectedFormProps<ProjectAssignmentFormData, OwnFormProps>
  & InjectedIntlProps
  & WithUser
  & OwnFormProps
  & OwnFormHandlers
  & OwnFormState
  & OwnFormStateUpdaters
  & FormValueProps;

const formCreateProps: mapper<ProjectAssignmentFormProps, OwnFormState> = (props: ProjectAssignmentFormProps): OwnFormState => {
  const { user } = props.userState;

  return {
    currentProject: props.initialData,
    projectFilter: {
      find: user ? user.uid : '',
      findBy: 'ownerEmployeeUid',
      statusTypes: [
        WorkflowStatusType.Approved
      ],
      assignmentStatus: 'unassigned',
    }
  };
};

const formStateUpdaters: StateUpdaters<{}, OwnFormState, OwnFormStateUpdaters> = {
  setProject: (prevState: OwnFormState) => (project?: any | undefined) => {

    if (!project) {
      return {
        ...prevState,
        currentProject: undefined
      };
    }

    return {
      ...prevState,
      currentProject: project
    };
  },
  setProjectHours: (prevState: OwnFormState) => (hours: number) => {
    if (prevState.currentProject) { 
      return {
        ...prevState,
        currentProject: { 
          ...prevState.currentProject,
          assignedHours: hours, 
          unassignedHours: prevState.currentProject.maxHours - hours
        }
      };
    }

    return {
      ...prevState
    };
  }
};

const formHandlers: HandleCreators<ProjectAssignmentFormProps, OwnFormHandlers> = {
  handleEventListener: (props: ProjectAssignmentFormProps) => (event: CustomEvent) => { 
    const formValues = event.detail as ProjectAssignmentFormData; 
    const { setProjectHours } = props;

    let hours: number = 0;

    if (formValues.items) {
      formValues.items.forEach(item => hours += item.mandays * 8);
    }

    setProjectHours(hours);
  },
  handleProjectChange: (props: ProjectAssignmentFormProps) => (project: IProjectList | undefined) => { 
    const { setProject } = props;

    setProject(project);
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentFormProps, OwnFormState> = {
  componentDidMount() {
    addEventListener('ASG_FORM', this.props.handleEventListener);
  },
  componentDidUpdate(prevProps: ProjectAssignmentFormProps) {
    // when assignment detail are not equals between previous and current
    if (prevProps.initialData !== this.props.initialData) {
      
      // when assignment response are filled from saga
      if (this.props.initialData) {
        this.props.setProject(this.props.initialData);
      }
    }

    // when formValues props are not equals between previous and current
    if (prevProps.formValues !== this.props.formValues) {

      // when form is 'reset' formValues will be cleared as undefined then clear project state
      if (this.props.formValues === undefined) {
        this.props.setProject();
      }
    }
  },
  componentWillUnmount() {
    removeEventListener('ASG_FORM', this.props.handleEventListener);
  }
};

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues('projectAssignment')(state) as ProjectAssignmentFormData
});

const enhance = compose<ProjectAssignmentFormProps, OwnFormProps & InjectedFormProps<ProjectAssignmentFormData, OwnFormProps>>(
  connect(mapStateToProps),
  withUser,
  injectIntl,
  withStateHandlers(formCreateProps, formStateUpdaters), 
  withHandlers(formHandlers),
  lifecycle(lifecycles),
)(ProjectAssignmentFormView);

const ProjectAssignmentForm = reduxForm<ProjectAssignmentFormData, OwnFormProps>({
  form: 'projectAssignment',
  touchOnChange: true,
  touchOnBlur: true,
  destroyOnUnmount: true,
  onChange: (values: ProjectAssignmentFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('ASG_FORM', { detail: values }));
  },
})(enhance);

// ----------------------------------------------------------------------------
// ProjectAssignmentEditorView.tsx
// ----------------------------------------------------------------------------

const ProjectAssignmentEditorView: React.SFC<ProjectAssignmentEditorProps> = props => (
  <ProjectAssignmentForm 
    formMode={props.formMode}
    initialData={props.generateInitialData()}
    initialValues={props.generateInitialValues()}
    validate={props.handleValidate}
    onSubmit={props.handleSubmit}
    onSubmitSuccess={props.handleSubmitSuccess}
    onSubmitFail={props.handleSubmitFail}
  />
);

// ----------------------------------------------------------------------------
// ProjectAssignmentEditor.ts
// ----------------------------------------------------------------------------

interface OwnEditorHandlers {
  generateInitialData: () => IProjectAssignmentDetail | undefined;
  generateInitialValues: () => ProjectAssignmentFormData | undefined;
  handleValidate: (values: ProjectAssignmentFormData) => any;
  handleSubmit: (values: ProjectAssignmentFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnEditorState {
  formMode: FormMode;
  companyUid?: string | undefined;
  projectUid?: string | undefined;
  assignmentUid?: string | undefined;
}

interface OwnEditorStateUpdaters extends StateHandlerMap<OwnEditorState> {
  stateUpdate: StateHandler<OwnEditorState>;
}

type ProjectAssignmentEditorProps 
  = WithProjectAssignment
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps
  & InjectedIntlProps
  & OwnEditorHandlers
  & OwnEditorState
  & OwnEditorStateUpdaters;

const editorCreateProps: mapper<ProjectAssignmentEditorProps, OwnEditorState> = (props: ProjectAssignmentEditorProps): OwnEditorState => {
  const { history } = props;
  
  const state = history.location.state;

  return { 
    formMode:  state ? FormMode.Edit : FormMode.New,
    companyUid: state ? state.companyUid : undefined,
    projectUid: state ? state.projectUid : undefined,
    assignmentUid: state ? state.assignmentUid : undefined
  };
};

const editorStateUpdaters: StateUpdaters<{}, OwnEditorState, OwnEditorStateUpdaters> = {
  stateUpdate: (prevState: OwnEditorState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const editorHandlers: HandleCreators<ProjectAssignmentEditorProps, OwnEditorHandlers> = {
  generateInitialData: (props: ProjectAssignmentEditorProps) => (): IProjectAssignmentDetail | undefined => {
    const { response } = props.projectAssignmentState.detail; 

    if (response && response.data) {
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
            hours: item.hours,
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
        Object.assign(errors, {[field]: props.intl.formatMessage(projectMessage.assignment.for(field, 'fieldRequired'))});
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
            Object.assign(itemError, {[`${field}`]: props.intl.formatMessage(projectMessage.assignment.for(field, 'fieldRequired'))});
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
      const message = intl.formatMessage(projectMessage.assignment.submission.invalidProps);

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
  handleSubmitSuccess: (props: ProjectAssignmentEditorProps) => (response: boolean) => {
    const { formMode, intl, history, assignmentUid } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(projectMessage.assignment.submission.updateSuccess);
    } else {
      message = intl.formatMessage(projectMessage.assignment.submission.createSuccess);
    }

    alertAdd({
      message,
      time: new Date()
    });

    if (assignmentUid) {
      history.push(`/project/assignment/details/${assignmentUid}`);
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
        message: intl.formatMessage(projectMessage.assignment.submission.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const editorLifecycles: ReactLifeCycleFunctions<ProjectAssignmentEditorProps, {}> = {
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
    layoutDispatch.actionCentreHide();

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
  withStateHandlers(editorCreateProps, editorStateUpdaters),
  withHandlers(editorHandlers),
  lifecycle(editorLifecycles)
)(ProjectAssignmentEditorView);