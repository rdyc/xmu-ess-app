import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeRateDetailFormProps } from './AccountEmployeeRateDetailForm';

export const AccountEmployeeRateDetailFormView: React.SFC<AccountEmployeeRateDetailFormProps> = props => {
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
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, {state: 'Rate'})}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};