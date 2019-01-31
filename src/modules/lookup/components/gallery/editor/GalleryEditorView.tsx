import * as React from 'react';
import { GalleryForm } from './form/upload/GalleryForm';
import { GalleryEditorProps } from './GalleryEditor';

export const GalleryEditorView: React.SFC<GalleryEditorProps> = props => (
  <GalleryForm
    validate={props.handleValidate}
    onSubmit={props.handleSubmit}
    onSubmitSuccess={props.handleSubmitSuccess}
    onSubmitFail={props.handleSubmitFail}
  />
);