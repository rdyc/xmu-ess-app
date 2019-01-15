import { Card, CardContent, CardHeader } from '@material-ui/core';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { Field } from 'redux-form';

import { HourDetailFormProps } from './HourDetailForm';

export const HourDetailFormView: React.SFC<HourDetailFormProps> = props => {
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
        title={props.intl.formatMessage(projectMessage.registration.section.hourTitle)}
        // subheader={props.intl.formatMessage(projectMessage.registration.section.hourSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};