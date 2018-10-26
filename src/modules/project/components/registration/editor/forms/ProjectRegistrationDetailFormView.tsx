import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { ProjectRegistrationDetailFormProps } from '@project/components/registration/editor/forms/ProjectRegistrationDetailForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const ProjectRegistrationDetailFormView: React.SFC<ProjectRegistrationDetailFormProps> = props => {
  const { formMode } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    // don't show uid & ownerEmployeeUid for new form
    const fields = ['uid', 'ownerEmployeeUid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

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
        title={<FormattedMessage id="project.infoTitle"/>}
        subheader={<FormattedMessage id="project.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};