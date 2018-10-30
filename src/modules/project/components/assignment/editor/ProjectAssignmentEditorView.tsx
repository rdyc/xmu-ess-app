import { FormMode } from '@generic/types';
import * as React from 'react';

import { ProjectAssignmentForm, ProjectAssignmentFormData } from '@project/components/assignment/editor/ProjectAssignmentForm';
import { ProjectAssignmentEditorProps } from './ProjectAssignmentEditor';

export const ProjectAssignmentEditorView: React.SFC<ProjectAssignmentEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectAssignmentState.detail;

  const renderForm = (formData: ProjectAssignmentFormData) => (
    <ProjectAssignmentForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: ProjectAssignmentFormData = {
    information: {
      projectUid: null,
    },
    items: []
  };

  // New
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }
  
  // Modify
  if (formMode === FormMode.Edit) {
    if (!isLoading && response && response.data) {
      const data = response.data;

      initialValues.information.projectUid = data.projectUid;

      if (data.items) {
        data.items.forEach(item => {
          initialValues.items.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            role: item.role || '',
            jobDescription: item.jobDescription || '',
            mandays: item.mandays
          });
        });
      }
      
      return renderForm(initialValues);
    }
  }
  
  return null;
};