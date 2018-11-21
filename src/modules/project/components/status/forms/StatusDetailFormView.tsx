import { Card, CardContent, CardHeader } from '@material-ui/core';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { Field } from 'redux-form';

import { StatusDetailFormProps } from './StatusDetailForm';

export const StatusDetailFormView: React.SFC<StatusDetailFormProps> = props => {
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
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
        title={props.intl.formatMessage(projectMessage.registration.section.statusTitle)}
        subheader={props.intl.formatMessage(projectMessage.registration.section.statusSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};