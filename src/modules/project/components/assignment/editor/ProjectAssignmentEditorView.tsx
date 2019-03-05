import * as React from 'react';

import { ProjectAssignmentEditorProps } from './ProjectAssignmentEditor';
import { ProjectAssignmentForm } from './ProjectAssignmentForm';

export const ProjectAssignmentEditorView: React.SFC<ProjectAssignmentEditorProps> = props => (
  <ProjectAssignmentForm 
    formMode={props.formMode}
    initialData={props.initialData}
    initialValues={props.initialValues}
    validate={props.handleOnValidate}
    onSubmit={props.handleOnSubmit}
    onSubmitSuccess={props.handleOnSubmitSuccess}
    onSubmitFail={props.handleOnSubmitFail}
  />
);