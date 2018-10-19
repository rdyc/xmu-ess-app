import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { OwnerDetailFormProps } from './OwnerDetailForm';

export const OwnerDetailFormView: React.SFC<OwnerDetailFormProps> = props => {
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`project.field.${name}`} />}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.ownerTitle"/>}
        subheader={<FormattedMessage id="project.ownerSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};