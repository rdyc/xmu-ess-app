import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeAccessDetailFormProps } from './AccountEmployeeAccessDetailForm';

export const AccountEmployeeAccessDetailFormView: React.SFC<AccountEmployeeAccessDetailFormProps> = props => {
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('access.', '');
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
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, {state: 'Access'})}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};