import { Card, CardContent, CardHeader } from '@material-ui/core';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { Field } from 'redux-form';

import { OwnerDetailFormProps } from './OwnerDetailForm';

export const OwnerDetailFormView: React.SFC<OwnerDetailFormProps> = props => {
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
        title={props.intl.formatMessage(projectMessage.registration.section.ownerTitle)}
        // subheader={props.intl.formatMessage(projectMessage.registration.section.ownerSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};