import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { withUser } from '@layout/hoc/withUser';
import { WithUser } from '@lookup/components/leave';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectAssignmentItem } from '@project/classes/request/assignment';
import { IProjectAssignmentDetail, IProjectList } from '@project/classes/response';
import { ProjectAssignmentFormView } from '@project/components/assignment/editor/ProjectAssignmentFormView';
import { connect } from 'react-redux';
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
import { getFormValues, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'projectAssignment';

export type ProjectAssignmentFormData = {
  information: {
    projectUid: string | null | undefined;
  },
  items: IProjectAssignmentItem[]; 
};

interface OwnProps {
  formMode: FormMode;
}

interface OwnHandlers {
  handleEventListener: (event: CustomEvent) => void;
  handleProjectChange: (project: IProjectList) => void;
}

interface OwnState {
  projectActive?: IProjectAssignmentDetail | undefined;
  projectFilter?: IProjectRegistrationGetListFilter | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setProject: StateHandler<OwnState>;
  setProjectHours: StateHandler<OwnState>;
}

interface FormValueProps {
  formValues: ProjectAssignmentFormData;
}

export type ProjectAssignmentFormProps 
  = InjectedFormProps<ProjectAssignmentFormData, OwnProps>
  & WithUser
  & OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters
  & FormValueProps;

const createProps: mapper<ProjectAssignmentFormProps, OwnState> = (props: ProjectAssignmentFormProps): OwnState => {
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

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setProject: (prevState: OwnState) => (project: IProjectList | undefined) => {

    if (!project) {
      return {
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
  setProjectHours: (prevState: OwnState) => (hours: number) => {
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

const handlerCreators: HandleCreators<ProjectAssignmentFormProps, OwnHandlers> = {
  handleEventListener: (props: ProjectAssignmentFormProps) => (event: CustomEvent) => { 
    const formValues = event.detail as ProjectAssignmentFormData; 
    const { setProjectHours } = props;

    let hours: number = 0;

    formValues.items.forEach(item => hours += item.mandays * 8);

    setProjectHours(hours);
  },
  handleProjectChange: (props: ProjectAssignmentFormProps) => (project: IProjectList | undefined) => { 
    const { setProject } = props;

    setProject(project);
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentFormProps, OwnState> = {
  componentDidMount() {
    addEventListener('ASG_FORM', this.props.handleEventListener);
  },
  componentWillUnmount() {
    removeEventListener('ASG_FORM', this.props.handleEventListener);
  }
};

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues(formName)(state) as ProjectAssignmentFormData
});

const enhance = compose<ProjectAssignmentFormProps, OwnProps & InjectedFormProps<ProjectAssignmentFormData, OwnProps>>(
  connect(mapStateToProps),
  withUser,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectAssignmentFormView);

export const ProjectAssignmentForm = reduxForm<ProjectAssignmentFormData, OwnProps>({
  form: formName, 
  destroyOnUnmount: true,
  touchOnChange: true,
  touchOnBlur: true,
  onChange: (values: ProjectAssignmentFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('ASG_FORM', { detail: values }));
  }
})(enhance);