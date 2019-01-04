import { ICommonSystem } from '@common/classes';
import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectAssignmentDetail, IProjectList } from '@project/classes/response';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

import { ProjectAssignmentFormView } from './ProjectAssignmentFormView';

export interface ProjectAssignmentItemFormData {
  uid: string | null;
  employeeUid: string;
  role: string | null;
  jobDescription: string | null;
  mandays: number;
  allocatedHours: number;
  consumedHours: number;
  statusType?: string | null;
  status?: ICommonSystem | null;
  rejectedReason?: string | null;
}
export interface ProjectAssignmentFormData {
  projectUid: string;
  items: ProjectAssignmentItemFormData[] | undefined;
}

interface OwnProps {
  formMode: FormMode;
  initialData?: IProjectAssignmentDetail | undefined;
}

interface OwnHandlers {
  handleEventListener: (event: CustomEvent) => void;
  handleProjectChange: (project: IProjectList | undefined) => void;
}

interface OwnState {
  currentProject?: IProjectAssignmentDetail | undefined;
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
  & InjectedIntlProps
  & WithUser
  & OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters
  & FormValueProps;

const createProps: mapper<ProjectAssignmentFormProps, OwnState> = (props: ProjectAssignmentFormProps): OwnState => {
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

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setProject: (prevState: OwnState) => (project?: any | undefined) => {

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
  setProjectHours: (prevState: OwnState) => (hours: number) => {
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

const handlers: HandleCreators<ProjectAssignmentFormProps, OwnHandlers> = {
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

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentFormProps, OwnState> = {
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

const formName = 'projectAssignment';

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues(formName)(state) as ProjectAssignmentFormData
});

const enhance = compose<ProjectAssignmentFormProps, OwnProps & InjectedFormProps<ProjectAssignmentFormData, OwnProps>>(
  connect(mapStateToProps),
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlers),
  lifecycle(lifecycles),
)(ProjectAssignmentFormView);

export const ProjectAssignmentForm = reduxForm<ProjectAssignmentFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  destroyOnUnmount: true,
  onChange: (values: ProjectAssignmentFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('ASG_FORM', { detail: values }));
  },
})(enhance);