import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeAccessDetailForm } from './AccountEmployeeAccessDetailForm';
import { AccountEmployeeAccessFormProps } from './AccountEmployeeAccessForm';

export const AccountEmployeeAccessFormView: React.SFC<AccountEmployeeAccessFormProps> = props => {
  const {
    formMode, companyUidValue, unitTypeValue
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <AccountEmployeeAccessDetailForm 
      formMode={formMode}
      context={context}
      companyUidValue={companyUidValue}
      unitTypeValue={unitTypeValue}
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