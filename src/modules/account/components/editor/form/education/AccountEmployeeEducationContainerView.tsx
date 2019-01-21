import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeEducationContainerProps } from './AccountEmployeeEducationContainer';
import { AccountEmployeeEducationDetail } from './AccountEmployeeEducationDetail';

export const AccountEmployeeEducationContainerView: React.SFC<AccountEmployeeEducationContainerProps> = props => {
  const { initialValues, formAction, formMode } = props;

  const fields = Object.getOwnPropertyNames(initialValues.education);

  const componentEducation = (context: BaseFieldsProps) => (
    <AccountEmployeeEducationDetail formMode={formMode} context={context} disabledControls={formAction === 'delete'}/>
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <FormSection name="education">
        <Fields names={fields} component={componentEducation} />
      </FormSection>
    </form>
  );

  return render;
};