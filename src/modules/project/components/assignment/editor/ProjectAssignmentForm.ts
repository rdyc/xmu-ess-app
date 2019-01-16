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
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { getFormValues, InjectedFormProps, reduxForm } from 'redux-form';

import { ProjectAssignmentFormView } from './ProjectAssignmentFormView';

export interface IProjectAssignmentItemFormData {
  uid?: string;
  employeeUid: string;
  role?: string;
  jobDescription?: string;
  mandays: number;
  allocatedHours: number;
  consumedHours: number;
  statusType?: string;
  status?: ICommonSystem;
  rejectedReason?: string;
}
export interface IProjectAssignmentFormData {
  projectUid: string;
  items: IProjectAssignmentItemFormData[] | undefined;
}

interface IOwnProps {
  formMode: FormMode;
  initialData?: IProjectAssignmentDetail | undefined;
}

interface IOwnHandlers {
  handleEventListener: (event: CustomEvent) => void;
  handleProjectChange: (project: IProjectList | undefined) => void;
}

interface IOwnState {
  currentProject?: IProjectAssignmentDetail | undefined;
  projectFilter?: IProjectRegistrationGetListFilter | undefined;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setProject: StateHandler<IOwnState>;
  setProjectHours: StateHandler<IOwnState>;
}

interface IFormValueProps {
  formValues: IProjectAssignmentFormData;
}

export type ProjectAssignmentFormProps 
  = InjectedFormProps<IProjectAssignmentFormData, IOwnProps>
  & InjectedIntlProps
  & WithUser
  & IOwnProps
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters
  & IFormValueProps;

const createProps: mapper<ProjectAssignmentFormProps, IOwnState> = (props: ProjectAssignmentFormProps): IOwnState => {
  const { user } = props.userState;

  return {
    currentProject: props.initialData,
    projectFilter: {
      find: user ? user.uid : '',
      findBy: 'ownerEmployeeUid',
      statusTypes: WorkflowStatusType.Approved,
      assignmentStatus: 'unassigned',
    }
  };
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  setProject: (prevState: IOwnState) => (project?: any | undefined) => {

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
  setProjectHours: (prevState: IOwnState) => (hours: number) => {
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

const handlers: HandleCreators<ProjectAssignmentFormProps, IOwnHandlers> = {
  handleEventListener: (props: ProjectAssignmentFormProps) => (event: CustomEvent) => { 
    const formValues = event.detail as IProjectAssignmentFormData; 
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

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentFormProps, IOwnState> = {
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

const mapStateToProps = (state: any): IFormValueProps => ({
  formValues: getFormValues(formName)(state) as IProjectAssignmentFormData
});

const enhance = compose<ProjectAssignmentFormProps, IOwnProps & InjectedFormProps<IProjectAssignmentFormData, IOwnProps>>(
  setDisplayName('ProjectAssignmentForm'),
  connect(mapStateToProps),
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlers),
  lifecycle(lifecycles),
)(ProjectAssignmentFormView);

export const ProjectAssignmentForm = reduxForm<IProjectAssignmentFormData, IOwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  destroyOnUnmount: true,
  onChange: (values: IProjectAssignmentFormData, dispatch: any, props: any) => {
    dispatchEvent(new CustomEvent('ASG_FORM', { detail: values }));
  },
})(enhance);