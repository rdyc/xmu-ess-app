import { RequestDetailFormProps } from '@expense/components/request/editor/forms/RequestDetailForm';
import { expenseMessages } from '@expense/locales/messages/expenseMessages';
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';

export const RequestDetailFormView: React.SFC<RequestDetailFormProps> = props => {
  const { formMode, intl } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show uid for new form
    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
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
        title={intl.formatMessage(expenseMessages.request.section.title)}
        subheader={intl.formatMessage(expenseMessages.request.section.subTitle)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};