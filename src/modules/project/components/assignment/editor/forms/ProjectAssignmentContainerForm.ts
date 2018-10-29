import { FormMode } from '@generic/types';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { ProjectAssignmentContainerFormView } from './ProjectAssignmentContainerFormView';

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

export type ProjectAssignmentContainerFormProps 
  = InjectedFormProps<ProjectAssignmentFormData, OwnProps>
  & OwnProps;

export const ProjectAssignmentContainerForm = reduxForm<ProjectAssignmentFormData, OwnProps>({
  form: 'projectAssignment',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(ProjectAssignmentContainerFormView);