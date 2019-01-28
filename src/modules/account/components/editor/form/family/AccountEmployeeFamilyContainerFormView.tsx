import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeFamilyFormProps } from './AccountEmployeeFamilyContainerForm';
import { AccountEmployeeFamilyDetailForm } from './AccountEmployeeFamilyDetailForm';

export const AccountEmployeeFamilyContainerFormView: React.SFC<
  AccountEmployeeFamilyFormProps
> = props => {
  const { initialValues, formAction, formMode } = props;

  const fields = Object.getOwnPropertyNames(initialValues.family);

  const componentFamily = (context: BaseFieldsProps) => (
    <AccountEmployeeFamilyDetailForm formMode={formMode} context={context} disabledControls={formAction === 'delete'} />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <FormSection name="family">
        <Fields names={fields} component={componentFamily} />
      </FormSection>
    </form>
  );

  return render;
};