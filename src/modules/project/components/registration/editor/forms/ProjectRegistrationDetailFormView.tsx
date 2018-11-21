import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import {
  ProjectRegistrationDetailFormProps,
} from '@project/components/registration/editor/forms/ProjectRegistrationDetailForm';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { Field } from 'redux-form';

export const ProjectRegistrationDetailFormView: React.SFC<ProjectRegistrationDetailFormProps> = props => {
  const { formMode, intl } = props;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show uid & ownerEmployeeUid for new form
    const fields = ['uid', 'ownerEmployeeUid'];
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
        title={intl.formatMessage(projectMessage.registration.section.infoTitle)}
        subheader={intl.formatMessage(projectMessage.registration.section.infoSubHeader)}
      />
      <CardContent>
        {
          props.context.names.map(name => renderField(name))
        }
      </CardContent>
    </Card>
  );

  return render;
};