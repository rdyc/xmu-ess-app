import { accountMessage } from '@account/locales/messages/accountMessage';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeImageFormProps } from './AccountEmployeeImageForm';

export const AccountEmployeeImageFormView: React.SFC<AccountEmployeeImageFormProps> = props => {
  const { intl } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('image.', '');
    const fieldProps = props.generateFieldProps(fieldName);

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
        title={intl.formatMessage(accountMessage.employee.section.basicTitle)}
        subheader={intl.formatMessage(accountMessage.employee.section.basicSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};