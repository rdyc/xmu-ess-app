import * as React from 'react';
import { COGSUploadEditorProps } from './COGSUploadEditor';
import { COGSUploadForm } from './form/upload/COGSUploadForm';

export const COGSUploadEditorView: React.SFC<COGSUploadEditorProps> = props => (
  <COGSUploadForm
    validate={props.handleValidate}
    onSubmit={props.handleSubmit}
    onSubmitSuccess={props.handleSubmitSuccess}
    onSubmitFail={props.handleSubmitFail}
  />
);