
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeRateDetailForm } from './AccountEmployeeRateDetailForm';
import { AccountEmployeeRateFormProps } from './AccountEmployeeRateForm';

export const AccountEmployeeRateFormView: React.SFC<AccountEmployeeRateFormProps> = props => {
  const {
    formMode,
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <AccountEmployeeRateDetailForm 
      formMode={formMode}
      context={context}
    />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <FormSection name="information">
        <Fields 
          names={fields}
          component={componentInformation}
        />
      </FormSection>
    </form>
  );

  return render;
};