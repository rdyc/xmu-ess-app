import { accountMessage } from '@account/locales/messages/accountMessage';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeBankFormProps } from './AccountEmployeeBankForm';

export const AccountEmployeeBankFormView: React.SFC<AccountEmployeeBankFormProps> = props => {
  const { intl } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('bank.', '');
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
        title={intl.formatMessage(accountMessage.employee.section.bankTitle)}
        subheader={intl.formatMessage(accountMessage.employee.section.bankSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};