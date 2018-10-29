import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProjectList } from '@project/classes/response';
import { SelectProject } from '@project/components/select/project';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
  pure,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { BaseFieldsProps } from 'redux-form';

import { ProjectAssignmentDetailFormView } from './ProjectAssignmentDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

interface OwnState {
  selectedProject: IProjectList | any | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setProject: StateHandler<OwnState>;
}

export type ProjectAssignmentDetailFormProps 
  = WithUser
  & InjectedIntlProps
  & OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<ProjectAssignmentDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: ProjectAssignmentDetailFormProps) => (name: string) => { 
    const { intl, setProject } = props;
    const { user } = props.userState;
    
    const fieldName = name.replace('information.', '');
    
    let fieldProps: {};
  
    switch (fieldName) {
      case 'projectUid':
        fieldProps = {
          placeholder: intl.formatMessage({id: `project.assignment.field.${name}.placeholder`}),
          filter: {
            find: user ? user.uid : '',
            findBy: 'ownerEmployeeUid',
            statusTypes: [WorkflowStatusType.Approved],
            assignmentStatus: 'unassigned',
          },
          onChangeCallback: (asu: any) => {
            setProject(asu);
            console.log(asu);
          },
          component: SelectProject,
        };
        break;
    
      default:
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }

    return fieldProps;
  },
};

const createProps: mapper<ProjectAssignmentDetailFormProps, OwnState> = (props: ProjectAssignmentDetailFormProps): OwnState => ({
  selectedProject: {}
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setProject: (prevState: OwnState) => (project: any) => {
    console.log(project);

    return {
      selectedProject: project
    };
    
  }
};

export const ProjectAssignmentDetailForm = compose<ProjectAssignmentDetailFormProps, OwnProps>(
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  pure
)(ProjectAssignmentDetailFormView);