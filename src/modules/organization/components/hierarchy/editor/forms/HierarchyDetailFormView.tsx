import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { Field } from 'redux-form';
import { HierarchyDetailFormProps } from './HierarchyDetailForm';

export const HierarchyDetailFormView: React.SFC<HierarchyDetailFormProps> = props => {
  const { intl, formMode } = props;
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
        title={intl.formatMessage(organizationMessage.hierarchy.section.infoTitle)}
        subheader={intl.formatMessage(organizationMessage.hierarchy.section.infoSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};