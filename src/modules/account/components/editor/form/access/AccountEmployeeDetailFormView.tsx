import { FormMode } from '@generic/types';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeAccessDetailFormProps } from './AccountEmployeeAccessDetailForm';

export const AccountEmployeeAccessDetailFormView: React.SFC<AccountEmployeeAccessDetailFormProps> = props => {
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    const exceptionFields = ['uid'];    
    if (props.formMode === FormMode.New && exceptionFields.indexOf(fieldName) !== -1) {
      return null;
    }

    return (
      <Field
        key={fieldName}
        name={fieldName}
        {...fieldProps}
      />
    );
  };

  const render = (
    <div>
      {names.map(name => renderField(name))}
    </div>
  );

  return render;
};