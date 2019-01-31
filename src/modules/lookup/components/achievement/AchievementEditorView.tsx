import * as React from 'react';
import { AchievementEditorProps } from './AchievementEditor';
import { AchievementForm } from './AchievementForm';

export const AchievementEditorView: React.SFC<AchievementEditorProps> = props => (
  <AchievementForm
    validate={props.handleValidate}
    onSubmit={props.handleSubmit}
    onSubmitSuccess={props.handleSubmitSuccess}
    onSubmitFail={props.handleSubmitFail}
  />
);