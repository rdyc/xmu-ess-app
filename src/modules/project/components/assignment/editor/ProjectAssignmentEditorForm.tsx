import { SelectEmployee } from '@account/components/select';
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
import { Button, Card, CardContent, CardHeader, Grid, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectAssignmentItem, IProjectAssignmentPatchPayload } from '@project/classes/request/assignment';
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
// Form.tsx
// ----------------------------------------------------------------------------

const complexItemsView: React.SFC<WrappedFieldArrayProps<IProjectAssignmentItem> & ComplexFormProps> = props => (
  <Grid container spacing={16}>
    {
      props.fields.map((field, index) => 
        <Grid key={index} item>
          <Card>
            <CardHeader title={`#${index + 1}`}
              action={
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
                  component={SelectEmployee}
                />
                <Field 
                  type="text"
                  name={`${field}.role`}
                  label={props.intl.formatMessage(projectMessage.assignment.field.role)}
                  placeholder={props.intl.formatMessage(projectMessage.assignment.field.rolePlaceholder)}
                  required={true}
                  component={InputText}
                />
                <Field 
                  type="text"
                  name={`${field}.jobDescription`}
                  label={props.intl.formatMessage(projectMessage.assignment.field.jobDesc)}
                  placeholder={props.intl.formatMessage(projectMessage.assignment.field.jobDescPlaceholder)}
                  component={InputTextArea}
                />
                <Field 
                  type="number"
                  name={`${field}.mandays`}
                  label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
                  placeholder={props.intl.formatMessage(projectMessage.assignment.field.mandaysPlaceholder)}
                  required={true}
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
      )
    }

    <Button onClick={() => props.fields.push({
      uid: null,
      employeeUid: '',
      role: '',
      jobDescription: '',
      mandays: 0
    })}>
      Add
    </Button>
  </Grid>
);

const complexView: React.SFC<ComplexFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <ProjectAssignment formMode={props.formMode} data={props.projectActive}>
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
            </ProjectAssignment>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={16}>
              <Grid item>
                <FieldArray name="items" props={props} component={complexItemsView} />
              </Grid>
              <Grid item>
                <Submission 
                  valid={props.valid}
                  reset={props.reset}
                  submitting={props.submitting}
                />
              </Grid>
            </Grid>
          </Grid>     
        </Grid>
      </Grid>   
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader 
            title="Values"
            subheader="form values as object"
          />
          <CardContent>
            <pre>{JSON.stringify(props.formValues, null, 2)}</pre>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </form>
);

// ----------------------------------------------------------------------------
// Form.ts
// ----------------------------------------------------------------------------

interface ComplexFormData {
  projectUid: string;
  items: IProjectAssignmentItem[] | undefined;
}

interface OwnProps {
  formMode: FormMode;
}

interface OwnFormHandlers {
  handleEventListener: (event: CustomEvent) => void;
  handleProjectChange: (project: IProjectList) => void;
}

interface OwnFormState {
  projectActive?: IProjectAssignmentDetail | undefined;
  projectFilter?: IProjectRegistrationGetListFilter | undefined;
}

interface OwnFormStateUpdaters extends StateHandlerMap<OwnFormState> {
  setProject: StateHandler<OwnFormState>;
  setProjectHours: StateHandler<OwnFormState>;
}

interface FormValueProps {
  formValues: ComplexFormData;
}

type ComplexFormProps 
  = InjectedFormProps<ComplexFormData>
  & InjectedIntlProps
  & WithUser
  & OwnProps
  & OwnEditorHandlers
  & OwnFormState
  & OwnFormStateUpdaters
  & FormValueProps;

const formCreateProps: mapper<ComplexFormProps, OwnFormState> = (props: ComplexFormProps): OwnFormState => {
  const { user } = props.userState;

  return {
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
  setProject: (prevState: OwnFormState) => (project?: IProjectList | undefined) => {

    if (!project) {
      return {
        ...prevState,
        projectActive: undefined
      };
    }

    return {
      ...prevState,
      projectActive: { 
        ...project,
        uid: '-',
        projectUid: project.uid, 
        assignedHours: 0, 
        unassignedHours: 0, 
        items: null,
        changes: null
      }
    };
  },
  setProjectHours: (prevState: OwnFormState) => (hours: number) => {
    if (prevState.projectActive) { 
      return {
        ...prevState,
        projectActive: { 
          ...prevState.projectActive,
          assignedHours: hours, 
          unassignedHours: prevState.projectActive.maxHours - hours
        }
      };
    }

    return {
      ...prevState
    };
  }
};

const formHandlers: HandleCreators<ComplexFormProps, OwnFormHandlers> = {
  handleEventListener: (props: ComplexFormProps) => (event: CustomEvent) => { 
    const formValues = event.detail as ComplexFormData; 
    const { setProjectHours } = props;

    let hours: number = 0;

    if (formValues.items) {
      formValues.items.forEach(item => hours += item.mandays * 8);
    }

    setProjectHours(hours);
  },
  handleProjectChange: (props: ComplexFormProps) => (project: IProjectList | undefined) => { 
    const { setProject } = props;

    setProject(project);
  }
};

const lifecycles: ReactLifeCycleFunctions<ComplexFormProps, OwnFormState> = {
  componentDidMount() {
    addEventListener('ASG_FORM', this.props.handleEventListener);
  },
  componentDidUpdate(prevProps: ComplexFormProps) {
    if (prevProps.formValues !== this.props.formValues && this.props.formValues === undefined) {
      this.props.setProject();
    }
  },
  componentWillUnmount() {
    removeEventListener('ASG_FORM', this.props.handleEventListener);
  }
};

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues('projectAssignment')(state) as ComplexFormData
});

const enhance = compose<ComplexFormProps, InjectedFormProps<ComplexFormData>>(
  connect(mapStateToProps),
  withUser,
  injectIntl,
  withStateHandlers(formCreateProps, formStateUpdaters), 
  withHandlers(formHandlers),
  lifecycle(lifecycles),
)(complexView);

const ReduxFormArray = reduxForm<ComplexFormData>({
  form: 'projectAssignment',
  touchOnChange: true,
  touchOnBlur: true,
  destroyOnUnmount: true,
  onChange: (values: ComplexFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('ASG_FORM', { detail: values }));
  },
})(enhance);

// ----------------------------------------------------------------------------
// Editor.tsx
// ----------------------------------------------------------------------------

const complexEditorView: React.SFC<ComplexEditorProps> = props => (
  <ReduxFormArray 
    validate={props.handleValidate}
    onSubmit={props.handleSubmit}
    onSubmitSuccess={props.handleSubmitSuccess}
    onSubmitFail={props.handleSubmitFail}
  />
);

// ----------------------------------------------------------------------------
// Editor.ts
// ----------------------------------------------------------------------------

interface OwnEditorHandlers {
  handleValidate: (values: ComplexFormData) => any;
  handleSubmit: (values: ComplexFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnEditorRouteParams {
  projectUid: string;
}

interface OwnEditorState {
  formMode: FormMode;
  projectUid?: string | undefined;
}

interface OwnEditorStateUpdaters extends StateHandlerMap<OwnEditorState> {
  stateUpdate: StateHandler<OwnEditorState>;
}

type ComplexEditorProps 
  = WithProjectAssignment
  & WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnEditorRouteParams>
  & InjectedIntlProps
  & OwnEditorHandlers
  & OwnEditorState
  & OwnEditorStateUpdaters;

const editorCreateProps: mapper<ComplexEditorProps, OwnEditorState> = (props: ComplexEditorProps): OwnEditorState => {
  const { match } = props;
  
  return { 
    formMode:  match.params.projectUid ? FormMode.Edit : FormMode.New,
    projectUid: match.params.projectUid
  };
};

const editorStateUpdaters: StateUpdaters<{}, OwnEditorState, OwnEditorStateUpdaters> = {
  stateUpdate: (prevState: OwnEditorState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const editorHandlers: HandleCreators<ComplexEditorProps, OwnEditorHandlers> = {
  handleValidate: (props: ComplexEditorProps) => (values: ComplexFormData) => { 
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
  handleSubmit: (props: ComplexEditorProps) => (values: ComplexFormData) => { 
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
  handleSubmitSuccess: (props: ComplexEditorProps) => (response: boolean) => {
    const { formMode, intl, history, projectUid } = props;
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

    if (projectUid) {
      history.push(`/project/assignment/details/${projectUid}`);
    }
  },
  handleSubmitFail: (props: ComplexEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

const editorLifecycles: ReactLifeCycleFunctions<ComplexEditorProps, {}> = {
  componentDidMount() {
    const { intl, layoutDispatch } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentRequest,
      parentUid: AppMenu.ProjectAssignment,
      title: intl.formatMessage({id: 'project.assignment.form.request.title'}),
      subTitle : intl.formatMessage({id: 'project.assignment.form.request.subHeader'})
    });

    layoutDispatch.navBackShow();
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export const ProjectAssignmentEditorForm = compose<ComplexEditorProps, {}>(
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
)(complexEditorView);