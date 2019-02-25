import { accountMessage } from '@account/locales/messages/accountMessage';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeContactFormProps } from './AccountEmployeeContactForm';

export const AccountEmployeeContactFormView: React.SFC<AccountEmployeeContactFormProps> = props => {
  const { intl } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('contact.', '');
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
        title={intl.formatMessage(accountMessage.employee.section.contactTitle)}
        subheader={intl.formatMessage(accountMessage.employee.section.contactSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};