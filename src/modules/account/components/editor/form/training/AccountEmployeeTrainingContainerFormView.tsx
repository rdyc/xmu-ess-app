import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeTrainingContainerFormProps } from './AccountEmployeeTrainingContainerForm';
import { AccountEmployeeTrainingDetailForm } from './AccountEmployeeTrainingDetailForm';

export const AccountEmployeeTrainingContainerFormView: React.SFC<AccountEmployeeTrainingContainerFormProps> = props => {
  const { formMode, initialValues, formAction } = props;

  const fields = Object.getOwnPropertyNames(initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <AccountEmployeeTrainingDetailForm formMode={formMode} context={context} disabledControls={formAction === 'delete'} />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <FormSection name="information">
        <Fields names={fields} component={componentInformation} />
      </FormSection>
    </form>
  );

  return render;
};
