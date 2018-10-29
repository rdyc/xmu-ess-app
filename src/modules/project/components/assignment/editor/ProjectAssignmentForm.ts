import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { withUser } from '@layout/hoc/withUser';
import { WithUser } from '@lookup/components/leave';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectAssignmentDetail, IProjectList } from '@project/classes/response';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { ProjectAssignmentFormView } from '@project/components/assignment/editor/ProjectAssignmentFormView';

export interface ProjectAssignmentItem {
  uid: string | null;
  employeeUid: string | null;
  role: string | null;
  jobDescription: string | null;
  mandays: number;
}

export type ProjectAssignmentFormData = {
  information: {
    projectUid: string | null;
  },
  items: ProjectAssignmentItem[]; 
};

interface OwnProps {
  formMode: FormMode;
}

interface OwnHandlers {
  onProjectChange: (project: IProjectList) => void;
}

interface OwnState {
  selectedProject?: IProjectAssignmentDetail | undefined;
  projectFilter?: IProjectRegistrationGetListFilter | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setProject: StateHandler<OwnState>;
}

export type ProjectAssignmentFormProps 
  = InjectedFormProps<ProjectAssignmentFormData, OwnProps>
  & WithUser
  & OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

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
        selectedProject: undefined
      };
    }

    return {
      selectedProject: { 
        ...project,
        uid: '-',
        projectUid: project.uid, 
        assignedHours: 0, 
        unassignedHours: 0, 
        items: null,
        changes: null
      }
    };
  }
};

const handlerCreators: HandleCreators<ProjectAssignmentFormProps, OwnHandlers> = {
  onProjectChange: (props: ProjectAssignmentFormProps) => (project: IProjectList | undefined) => { 
    const { setProject } = props;

    setProject(project);
  }
};

const enhance = compose<ProjectAssignmentFormProps, OwnProps & InjectedFormProps<ProjectAssignmentFormData, OwnProps>>(
  withUser,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators)
)(ProjectAssignmentFormView);

export const ProjectAssignmentForm = reduxForm<ProjectAssignmentFormData, OwnProps>({
  form: 'projectAssignment',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);