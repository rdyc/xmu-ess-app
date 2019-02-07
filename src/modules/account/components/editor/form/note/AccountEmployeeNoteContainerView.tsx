import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeNoteContainerProps } from './AccountEmployeeNoteContainer';
import { AccountEmployeeNoteDetail } from './AccountEmployeeNoteDetail';

export const AccountEmployeeNoteContainerView: React.SFC<AccountEmployeeNoteContainerProps> = props => {
  const { initialValues, formAction, formMode } = props;

  const fields = Object.getOwnPropertyNames(initialValues.note);

  const componentNote = (context: BaseFieldsProps) => (
    <AccountEmployeeNoteDetail formMode={formMode} context={context} disabledControls={formAction === 'delete'}/>
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <FormSection name="note">
        <Fields names={fields} component={componentNote} />
      </FormSection>
    </form>
  );

  return render;
};