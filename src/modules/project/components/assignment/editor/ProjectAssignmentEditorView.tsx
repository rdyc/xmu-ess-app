import * as React from 'react';

import { ProjectAssignmentEditorProps } from './ProjectAssignmentEditor';
import { ProjectAssignmentForm } from './ProjectAssignmentForm';

export const ProjectAssignmentEditorView: React.SFC<ProjectAssignmentEditorProps> = props => (
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